const { 
    createUsersController,
    getUsersControllers,
    deleteUsersControllers } = require('../controllers/userControllers')

    const {
        getUsersByIdCforanea,
        getUsersByEmail
    } = require('../handlers/handlerUserModels')

const allUsers = async (req, res) => {
    try {
        const data = await getUsersControllers(req.query)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)
    }
}

const getUsersRouteClaveForanea = async (req, res) => {
    try {
        const data = await getUsersByIdCforanea(req.body)
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(404).json(error)
    }
}

const getUsersRouteByEmail = async (req, res) => {
    try {
        const data = await getUsersByEmail(req.body)
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
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
const deleteUsers = async (req, res) => {
    try {
        const data = await deleteUsersControllers(req.params)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports = { 
    allUsers, 
    createUser, 
    deleteUsers,
    getUsersRouteClaveForanea,
    getUsersRouteByEmail
}