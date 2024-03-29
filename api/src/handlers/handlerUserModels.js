// const{ Users } = require('../database.js')
const { Op } = require("sequelize");
const { User, Admin, Postulant, Company, Offers, Payment } = require("../models/relations.js");
const { mailRegisterUser } = require('./Utils/sendMail');
const { mailPqrs } = require("./Utils/SendMailPqrs.js");
// Post
const createUsers = async ({ photo, names, lastnames, email, city, country, password, rol, active, phone, document, age, disability, gender, experience, curriculum_pdf, tecnology, linkedin, facebook, description_postulant, title, languages, companyname, email_company, description, phone_company, website, logo, company_city, company_country, }) => {
    try {
        const [usuario, creado] = await User.findOrCreate({
            where: { email },
            defaults: {
                photo, names, lastnames, email, city, country, password, rol, active, phone
            }
        });

        if (creado) {
            mailRegisterUser(email, names, rol)//cuando te registras envie un mail
            switch (rol) {
                case 'Postulante':
                    const Postulants = await Postulant.create({
                        document, age, disability, gender, experience, curriculum_pdf, tecnology, linkedin, facebook, description_postulant, title, languages,
                        userId: usuario.id
                    });
                    return { ...usuario.dataValues, Postulants }
                case 'Empresa':
                    const Companies = await Company.create({
                        companyname, email_company, description, phone_company, website, logo, company_city, company_country,
                        userId: usuario.id
                    });
                    return { ...usuario.dataValues, Companies }
                case 'Admin':
                    const newAdmin = await Admin.create({ userId: usuario.id });
                    return { ...usuario.dataValues, newAdmin }
                default:
                    throw 'Tipo de usuario no válido'
            }
        }
        if (!creado) {
            const updatedUser = await User.update({ photo, names, lastnames, email, city, country, password, rol, active, phone }, { where: { id: usuario.id } });
            switch (rol) {
                case 'Postulante':
                    const postulant = await Postulant.update({
                        document, age, disability, gender, experience, curriculum_pdf, tecnology, linkedin, facebook, description_postulant, title, languages,
                    },
                        {
                            where: { userId: usuario.id }
                        });
                    return { ...updatedUser.dataValues, ...postulant.dataValues }
                case 'Empresa':
                    const company = await Company.update({
                        companyname, email_company, description, phone_company, website, logo, company_city, company_country,
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
                },
            ],
            attributes: { exclude: ['password'] },
            // where: {
            //     active: true
            // },
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
const premiumState = async (id, state, active) => {
    try {
        const user = await User.findByPk(id)
        if (!user) throw Error('Usuario no encontrado')
        // Actualiza el premium
        if (state === 'true') {
            await User.update({ premium: true }, { where: { id } })
            return 'Usuario Premium'
        }
        if (state === 'false') {
            await User.update({ premium: false }, { where: { id } })
            return 'Usuario no Premium'
        }

        // Actualiza active
        if (active === 'true') {
            await User.update({ active: true }, { where: { id } })
            return 'Usuario Desbaneado'
        }
        if (active === 'false') {
            await User.update({ active: false }, { where: { id } })
            return 'Usuario Baneado'
        }

    } catch (error) {
        throw error
    }
}

const getUsersByEmail = async (data) => {
    const createAdmin = await User.findOne({ where: { email: "admin@admin.com" } })
    if (!createAdmin) {
        await User.create({
            rol: 'Admin',
            email: 'admin@admin.com',
            names: 'SuperAdmin',
            lastnames: '',
            photo: 'https://i.pinimg.com/736x/cd/8c/65/cd8c65c7813855d5f58cf91801b1d256.jpg',
            password: 'admin123',
            active: true
        })
    }
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
    const user = await User.findOne({
        where: {
            id: id
        },
        include: [{ 
                model: Company 
            }, 
            { 
                model: Postulant 
            }]
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
const putUsers = async ({ id }, { names, lastnames, phone, email, photo, website }) => {
    // Comprueba si existe el usuario
    const user = await User.findByPk(id);
    if (!user) throw Error(`El usuario con id: ${id} no existe`);

    // Comprueba si falta algun dato
    if (!names || !lastnames || !phone || !email || !photo || !website) throw Error('Faltan Datos');

    // Actualiza los datos
    await User.update(
        { names, lastnames, phone, email, photo, website },
        {
            where: { id }
        }
    )
    return `${names} has been updated`;
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
    try {
        const deleteUsers = await User.findByPk(id);
        if (!deleteUsers) throw Error('Usuario no encontrado')
        await deleteUsers.destroy();
        return `${deleteUsers.names} ha sido eliminado con éxito de la base de datos.`;
    } catch (error) {
        console.log(error)
        throw error
    }
};

// PQRS
const pqrsUser = async ({ usuario, correo, asunto, mensaje, userId }) => {
    try {
        mailPqrs(usuario, correo, asunto, mensaje, userId)
        return `La PQRS ha sido enviada con exito.`;
    } catch (error) {
        console.log(error)
        throw error
    }
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
    getUsersByIdCforanea,
    premiumState,
    pqrsUser
};