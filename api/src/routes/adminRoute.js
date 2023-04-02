const { 
    getAdminControllers,
    createAdminController,
    putAdminControllers,
    getAdminByIdControllers,
    deleteAdminControllers,
    getAllDataController,
    } = require('../controllers/adminControllers')

const allAdmin = async (req, res) => {
    try {
        const data = await getAdminControllers (req.query)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)
    }
}

const createAdmin = async (req, res) => {
    try {
        const data = await  createAdminController(req.body)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)
    }
}
//el put no modifica
const putAdmin = async (req, res) => {
    try {
        const data = await  putAdminControllers (req.body)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)
    }
}

const getadminbyid = async (req, res) => {
    try {
        const data = await getAdminByIdControllers(req.params)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)
    }
}

const getAllData = async (req, res) => {
    try {
        const allData = await getAllDataController()
        res.status(200).json(allData)
    } catch (error) {
        res.status(404).json(error)
    }
}


const deleteadmin = async (req, res) => {
    try {
        const data = await deleteAdminControllers(req.params)
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error)
    }
}



module.exports = { 
    allAdmin, 
    createAdmin,
    putAdmin,
    deleteadmin,
    getadminbyid,
    getAllData,
}