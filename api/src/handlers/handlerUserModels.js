// const{ Users } = require('../database.js')
const { Op } = require("sequelize");
const { User, Admin, Postulant, Company, Offers } = require("../models/relations.js");
const{mailRegisterUser}=require('./Utils/sendMail');
// Post
const createUsers = async ({ photo, names, lastnames, email, city, country, password, rol, active, phone, document, age, disability, gender, experience, curriculum_pdf, tecnology, linkedin, facebook, companyname, email_company, description, phone_company, website, logo }) => {
    try {
        const [usuario, creado] = await User.findOrCreate({
            where: { email },
            defaults: {
                photo, names, lastnames, email, city, country, password, rol, active, phone
            }
        });
        if (creado) {
            switch (rol) {
                case 'Postulante':
                    const Postulants = await Postulant.create({
                        document, age, disability, gender, experience, curriculum_pdf, tecnology, linkedin, facebook,
                        userId: usuario.id
                    });
                    return { ...usuario.dataValues, Postulants }
                case 'Empresa':
                    const Companies = await Company.create({
                        companyname, email_company, description, phone_company, website, logo, 
                        userId: usuario.id
                    });
                    return { ...usuario.dataValues, Companies }
                default:
                    throw 'Tipo de usuario no válido'
            }
        }
        if (!creado) {
            const updatedUser = await User.update({ photo, names, lastnames, email, city, country, password, rol, active, phone }, { where: { id: usuario.id } });
            switch (rol) {
                case 'Postulante':
                    const postulant = await Postulant.update({
                        document, age, disability, gender, experience, curriculum_pdf, tecnology, linkedin, facebook,
                    },
                        {
                            where: { userId: usuario.id }
                        });
                    return { ...updatedUser.dataValues, ...postulant.dataValues }
                case 'Empresa':
                    const company = await Company.update({
                        companyname, email_company, description, phone_company, website, logo,
                    },
                        {
                            where: { userId: usuario.id }
                        });
                    return { ...updatedUser.dataValues, ...company.dataValues }
                default:
                    throw 'Tipo de usuario no válido'
            }
        }
    } catch (err) {
        console.log(err)
        throw err
    }
}

//      Activos
const getUsers = async () => {
    try {
        const users = await User.findAll({
            include: [
                {
                    model: Admin,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
                },
                {
                    model: Postulant,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
                },
                {
                    model: Company,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
                },
                {
                    model: Offers,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'userId'] },
                }
            ],
            where: {
                active: true
            },
        });
        return users
    } catch (error) {

    }
};
const getUsersByName = async (name) => {
    const users = await User.findAll({
        where: {
            nombres: { [Op.iLike]: `%${name}%` },
            estado: 1
        },
    });
    return users;
};

const getUsersByEmail = async ( data ) => {
    const email = typeof data === 'object' && data.email ? data.email : typeof data === 'string' ? data : null;
    try {
        const user = await User.findOne({
            where: { email },
            include: [{ model: Company }, { model: Postulant }]
        });
        return user
    } catch (error) {
        throw error
    }
};

const getUsersById = async (id) => {
    const user = await User.findByPk(id, {
        where: {
            estado: 1
        },
    });
    return user;
};

const getUsersByIdCforanea = async ({ id }) => {
    const user = await User.findOne({
        where: { id: id },

        include: [{ model: Company }, { model: Postulant }]
    });
    return user;
};

//      Inactivos
const getUsersInact = async () => {
    const usersInact = await User.findAll({
        where: {
            estado: 0
        },
    });
    return usersInact;
};
const getUsersInactById = async (id) => {
    const userInact = await User.findByPk(id, {
        where: {
            estado: 0
        },
    });
    return userInact;
};

// Puts
const putUsers = async (id, nombres, apellidos, celular, correo, discapacidad, genero) => {
    // Comprueba si existe el usuario
    const user = await User.findByPk(id);
    if (!user) throw Error(`El usuario con id: ${id} no existe`);

    // Comprueba si falta algun dato
    if (!nombres || !apellidos || !celular || !correo || !discapacidad || !genero) throw Error('Faltan Datos');

    // Actualiza los datos
    await User.update(
        { nombres, apellidos, celular, correo, discapacidad, genero },
        {
            where: { id }
        }
    )
    return `${nombres} has been updated`;
};

const putState = async (id, active) => {
    // Comprueba si existe el usuario
    const user = await User.findByPk(id);
    if (!user) throw Error(`El id: ${id} no existe`);

    // Actualiza el estado
    await User.update(
        { active },
        {
            where: { id }
        }
    )
    return `${nombres} has been updated`;
};

// Delete
const deleteUsers = async (id) => {
    const deleteUsers = await User.findByPk(id);
    await deleteUsers.destroy();
    return `${deleteUsers.nombres} ha sido eliminado con éxito de la base de datos.`;
};

module.exports = {
    createUsers,
    getUsers,
    getUsersById,
    getUsersByName,
    getUsersInact,
    getUsersInactById,
    putUsers,
    putState,
    deleteUsers,
    getUsersByEmail,
    getUsersByIdCforanea
};