const { createUsers } = require("../handlers/handlerUserModels")
const {firebase, googleProvider} = require('../auth/firebase.config')
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

const authLoginGoogle = async (body) => {
  try {
    await firebase.auth().signInWithRedirect(googleProvider)
    return "Redirigiendo a Google para autenticación..."
  } catch (error) {
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

module.exports = { authCreatePostulant, authLoginGoogle, authLoginGoogleCB }