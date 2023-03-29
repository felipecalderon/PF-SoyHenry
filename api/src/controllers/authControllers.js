const { createUsers } = require("../handlers/handlerUserModels")
const { admin, firebase } = require('../auth/firebase.config')
const { getAuth, GoogleAuthProvider, signInWithCredential, getUserByEmail } = require("firebase/auth")
const { getUsersByEmail } = require('../handlers/handlerUserModels')
const { compareSync } = require('bcrypt')

const authCreatePostulant = async (body) => {
  try {
    const auth = admin.auth();
    const { email, password } = body;
    const userExists = await getUsersByEmail(email);
    if (userExists) {
      return await createUsers(body);
    }
    const newUsercreatedDB = await createUsers(body);
    await auth.createUser({
      email,
      password,
      uid: newUsercreatedDB.id,
    });
    return newUsercreatedDB; // `Inicio de sesion exitoso`
  } catch (error) {
    throw error;
  }
}

const authLoginCredentials = async ({ email, password }) => {
  try {
    const auth = admin.auth();
    const user = await getUsersByEmail({ email })
    const userCredential = await auth.getUserByEmail(email) //solo verifica que exista en firebase
    if (!user) throw 'Usuario no existe en DB'
    const passwordValid = compareSync(password, user.password) //verifica que clave sea la misma en BD
    if (!passwordValid) throw 'Contraseña incorrecta'
    return { user }
  } catch (error) {
    throw error
  }
}
const authLoginGoogle = async ({ token }) => {
  try {
    const auth = getAuth()
    const credential = GoogleAuthProvider.credential(token)
    const result = await signInWithCredential(auth, credential)
    return result
  } catch (error) {
    return `Error al autenticar con Google: ${error.message}`
  }
}

module.exports = { authCreatePostulant, authLoginGoogle, authLoginCredentials }