const { createUsers } = require("../handlers/handlerUserModels")
const { OAuth2Client } = require('google-auth-library');
const { firebase, googleProvider } = require('../auth/firebase.config')
require('firebase/auth');

const authCreatePostulant = async (body) => {
    try {
        const { email, password } = body
          const usercreatedDB = await createUsers(body)
          const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password, {
            uid: usercreatedDB.userId
          })
          const user = userCredential.user
        return `Usuario creado exitosamente: ${user}`
    } catch (error) {
        throw error
    }
}

const CLIENT_ID = '110189196879-qpnr4pooikg2o4nsgpnla6as3p48ffdn.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const authLoginGoogle = async () => {
  try {
    // Obtener token de acceso de Google
    const { tokens } = await client.getAccessToken();

    // Usar el token de acceso para obtener el token de ID de Google
    const googleIdToken = tokens.id_token;

    // Iniciar sesión en Firebase con el token de ID de Google
    const userCredential = await firebase.auth().signInWithCredential(
      firebase.auth.GoogleAuthProvider.credential(googleIdToken)
    );

    // Obtener el usuario actual
    const user = userCredential.user;

    // Esperar a que se complete la autenticación con Firebase antes de obtener el código de verificación
    await user.getIdTokenResult();

    // Obtener el código de verificación para el usuario actual
    const code = user.refreshToken;

    // Devolver el usuario y el código de verificación
    return { user, code };
  } catch (error) {
    console.log(error);
    return `Error al autenticar con Google: ${error.message}`
  }
}

const authLoginGoogleCB = async (body) => {
  try {
    const result = await firebase.auth().getRedirectResult()

    return "Autenticación con Google exitosa!"
  } catch (error) {
    return `Error al autenticar con Google: ${error.message}`
  }
}

module.exports = {authCreatePostulant, authLoginGoogle, authLoginGoogleCB}