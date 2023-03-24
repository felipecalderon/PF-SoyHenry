const { createUsers } = require("../handlers/handlerUserModels")
const firebase = require('../auth/firebase.config')
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential} = require("firebase/auth")
const { getUsersByEmail } = require('../handlers/handlerUserModels')
const authCreatePostulant = async (body) => {
    try {
        const auth = getAuth();
        const { email, password } = body
          const usercreatedDB = await createUsers(body)
          const userCredential = await createUserWithEmailAndPassword(auth, email, password, {
            uid: usercreatedDB.userId
          })
          const user = userCredential.user
        return `Inicio de sesion exitoso`
    } catch (error) {
      console.log(error);
        throw 'Error al iniciar sesión'
    }
}
const authLoginCredentials = async ({email, password}) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const {token} = userCredential.user.stsTokenManager
    const user = await getUsersByEmail(email)
    console.log(user, token);
    return {token, user}
  } catch (error) {
      throw error
  }
}
const authLoginGoogle = async ({token}) => {
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