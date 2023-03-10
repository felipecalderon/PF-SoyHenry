const { 
    createUsersController,
    getUsersControllers,
    getUsersByIdControllers,
    getUsersInactControllers,
    getUsersInactByIdControllers,
    putUsersControllers,
    putStateControllers,
    deleteUsersControllers } = require('../controllers/userControllers')

const allUsers = async (req, res) => {
    try {
        const data = await getUsersControllers(req.query)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)
    }
}

const createUser = async (req, res) => {
    try {
        const data = await createUsersController(req.body)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports = { allUsers, createUser }