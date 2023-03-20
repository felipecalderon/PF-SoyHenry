const { createUsers } = require("../handlers/handlerUserModels")
const { firebase, googleProvider } = require('../auth/firebase.config')
require('firebase/auth');

const { OAuth2Client } = require('google-auth-library');
const { google } = require('googleapis');

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

const CLIENT_ID = '110189196879-75dnlr4k8251itd3a7v1lbmmkrb57o5n.apps.googleusercontent.com';
const CLIENT_SECRET = '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'
const REDIRECT_URL = 'https://fusionajobs-e2a1a.firebaseapp.com'

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/userinfo.email']
});

const authLoginGoogle = async () => {
    const client = await auth.getClient();

  client.on('tokens', (tokens) => {
    if (tokens.refresh_token) {
      // store the refresh_token in my database!
      console.log(tokens.refresh_token);
    }
    console.log(tokens.access_token);
  });

  const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
  const res = await client.request({ url });
  // The `tokens` event would now be raised if this was the first request
  
  
  // try {
    
  //   const { tokens } = await authUrl.getToken(code);

  // // Configurar el token de acceso en Firebase Authentication
  // const credential = firebase.auth.GoogleAuthProvider.credential(null, tokens.access_token);
  // await firebase.auth().signInWithCredential(credential);

  // // Obtener el token de actualización y devolverlo al cliente
  // const refreshToken = tokens.refresh_token;
  // return { refreshToken };
  // } catch (error) {
  //   console.log(error);
  //   return `Error al autenticar con Google: ${error.message}`
  // }
}

const authLoginGoogleCB = async (body) => {
  try {
    const result = await firebase.auth().getRedirectResult()

    return "Autenticación con Google exitosa!"
  } catch (error) {
    return `Error al autenticar con Google: ${error.message}`
  }
}

module.exports = { authCreatePostulant, authLoginGoogle, authLoginGoogleCB }