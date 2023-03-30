const { createUsers } = require("../handlers/handlerUserModels")
const { admin, firebase } = require('../configs/auth/firebase.config')
const { getAuth, GoogleAuthProvider, signInWithCredential, getUserByEmail} = require("firebase/auth")
const { getUsersByEmail } = require('../handlers/handlerUserModels')
const { compareSync } = require('bcrypt')

const authVerifyFb = async (email) => {
  try {
    await auth.getUserByEmail(email)
    return true
  } catch (error) {
    return false
  }
}

const authCreatePostulant = async (body) => {
  try {
    const auth = admin.auth();
      const { email, password } = body
      const newUsercreatedDB = await createUsers(body)
      const verifyUserExistFB = authVerifyFb(email)
      if(verifyUserExistFB){
      await auth.createUser({
        email,
        password,
        uid: newUsercreatedDB.id,
      });
    }
        return newUsercreatedDB // Inicio de sesion exitoso
    } catch (error) {
      console.log(error)
        throw 'Error al iniciar sesión'
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