const { createUsers } = require("../handlers/handlerUserModels");
const firebase = require('../auth/firebase.config');
const authCreatePostulant = async (body) => {
    try {
        const { email, password } = body;
          const usercreatedDB = await createUsers(body)
          const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password, {
            uid: usercreatedDB.userId
          });
          const user = userCredential.user;
          console.log(usercreatedDB)
        return `Usuario creado exitosamente: ${user}`
    } catch (error) {
        throw error
    }
}

module.exports = {authCreatePostulant}