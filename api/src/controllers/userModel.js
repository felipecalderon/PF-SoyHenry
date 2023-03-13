const User = require('../models/userModel')

const getUsers = async () => {
    try {
        const dataUser = await User.findAll()
        return dataUser
    } catch (error) {
        throw error
    }
}

module.exports = { getUsers }