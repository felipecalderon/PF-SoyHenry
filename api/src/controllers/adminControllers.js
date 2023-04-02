const{
    getAdmin,
    createAdmin,
    putAdminRol,
    getAdminById,
    deleteAdmin,
    allData
}= require('../handlers/handlersAdmin');


const getAdminControllers = async ( ) => {
    try {
        const response =  await getAdmin();
        return response
    } catch (error) {
        console.log(error)
        throw { error: error.message }
    }
};

const createAdminController = async (body) => {
    
    try {
        const newAdmin = await createAdmin(body);
        return newAdmin
    } catch (error) {
        throw error
    }
};

const getAdminByIdControllers = async ( { id } ) => {
    try {
        const response = await getAdminById( id );
        return response
    } catch (error) {
        throw { error: error.message }
    }
};


const putAdminControllers = async ( { id } ) => {
    const { activo } = req.body;
    try {
        const response = await putAdminRol( id, activo );
        return response
    } catch (error) {
        throw { error: error.message }
    }
};

const getAllDataController = async () => {
    try {
        const response = await allData( );
        return response
    } catch (error) {
        throw { error: error.message }
    }
}

const deleteAdminControllers = async ( { id } ) => {
    try {
        const response = await deleteAdmin( id );
        return response
    } catch (error) {
        throw { error: error.message }
    }
};


module.exports={
    getAdminControllers,
    createAdminController,
    getAdminByIdControllers,
    putAdminControllers,
    deleteAdminControllers,
    getAllDataController,
};