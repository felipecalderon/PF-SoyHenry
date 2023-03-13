const {getUsers} = require('../controllers/userModel')

const allUsers = async (req, res) => {
    try {
        const data = await(getUsers)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)
    }

}

module.exports = {allUsers}