const { DateTime } = require('luxon');
const { User, Admin, Postulant, Offers } = require("../models/relations.js");
const { Op } = require('sequelize');

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
const createAdmin = async ({ username, email, rol, activo, aptitudes, empresas, usuarios, publicaciones }) => {
    try {

        const newUser = await User.create({
            username, email, rol, activo
        });
        const newAdmin = await Admin.create({

            aptitudes, empresas, usuarios, publicaciones, rol, activo,
            userId: newUser.id
        });


        return newAdmin;


    } catch (err) {
        throw err
    }
}

const putAdminRol = async (id, aptitudes, empresas, usuarios, publicaciones, rol, activo,) => {

    const admin = await Admin.findByPk(id);
    if (!admin) throw Error(`El admin con id: ${id} no existe`);


    await Admin.update(
        { aptitudes, empresas, usuarios, publicaciones, rol, activo },
        {
            where: { id }
        }
    )
    return `${rol} has been updated`;
};

//busqueda por id del admin
const getAdminById = async (id) => {
    const admin = await Admin.findByPk(id, {
        where: {
            activo: true
        },
    });
    return admin;
};

const allData = async () => {
    const postulantes = await User.findAll({
        where: {
            rol: 'Postulante'
        }
    })
    const empresa = await User.findAll({
        where: {
            rol: 'Empresa'
        }
    })
    const ofetasActivas = await Offers.findAll({
        where: {
            active: true
        }
    })
    const offestasDesactivadas = await Offers.findAll({
        where: {
            active: false
        }
    })

    const currentDate = DateTime.local(); // fecha actual
    const expirationLimit = currentDate.plus({ days: 7 }); // fecha que se usara como condicional para traer todas las ofertas que esten desde esa fecha a la de "hoy"

    const ofertasPorDesactivar = await Offers.findAll({ // traera las ofertas que sean menores a la fecha limite y que esten activas
        where: {
            expiring_offers: {
                [Op.lt]: expirationLimit.toJSDate() // operador de sequelize lt === <
            },
            active: true
        }
    });
    
    const allData = {
        postulans: postulantes.length,
        recluters: empresa.length,
        offers_active: ofetasActivas.length,
        expiring_offers: ofertasPorDesactivar.length,
        offer_desactive: offestasDesactivadas.length
    }

    return allData
}


//borrado de la db
const deleteAdmin = async (id) => {
    const deleteAdmin = await Admin.findByPk(id);
    await deleteAdmin.destroy();
    return "admin boorrado correctamente";
};



module.exports = {
    getAdmin,
    createAdmin,
    putAdminRol,
    getAdminById,
    deleteAdmin,
    allData
};