const { User, Admin, Postulant } = require("../models/relations.js");


//traer todos los admin activos.
const getAdmin = async () => {
    const admin = await Admin.findAll({
        where: {
            activo: true
        },
    });
    return admin;
};

//para crear un  admin
//fijarse si esta biem hecho el post que tengo dudas..
const createAdmin= async ({ username,email,rol,activo,aptitudes,empresas,usuarios,publicaciones }) => {
    try {

        const newUser = await User.create({
            username, email, rol, activo
            });
        const newAdmin = await Admin.create({

            aptitudes,empresas,usuarios,publicaciones,rol,activo,
            userId:newUser.id
        });

    
        return newAdmin;

        
    } catch(err) {
      throw err
    }
}

const putAdminRol = async ( id, aptitudes,empresas,usuarios,publicaciones,rol,activo, ) => {
    
    const admin = await Admin.findByPk( id );
    if( !admin ) throw Error( `El admin con id: ${id} no existe` );
    
    
    await Admin.update(
        { aptitudes,empresas,usuarios,publicaciones,rol,activo},
        {
            where: { id }
        }
    )
    return `${rol} has been updated`;
};

//busqueda por id del admin
const getAdminById = async ( id ) => {
    const admin = await Admin.findByPk( id, {
        where: {
            activo: true
        },
    } );
    return admin;
};


//borrado de la db
const deleteAdmin = async ( id ) => {
    const deleteAdmin = await Admin.findByPk( id );
    await deleteAdmin.destroy();
    return "admin boorrado correctamente";
};



module.exports={
    getAdmin,
    createAdmin,
    putAdminRol,
    getAdminById,
    deleteAdmin,
};