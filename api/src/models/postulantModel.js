const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database');

const Postulant = sequelize.define('Postulant', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    photo: {
        type: DataTypes.TEXT,
    },
    names: {
        type: DataTypes.STRING,
        isAlpha: true,
    },
    Document: {
        type: DataTypes.STRING,
    },
    lastnames: {
        type: DataTypes.STRING,
        isAlpha: true,
    },
    age:{
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
        isNumeric: true,
        unique: true,
    },
    disability: {
        type: DataTypes.STRING,
        isAlpha: true,
    },
    gender: {
        type: DataTypes.ENUM('Femenino', 'Masculino', 'Prefiero no decirlo'),
    },
    experience: {
        type: DataTypes.ENUM('0', '1', '2-4', '5'),
    },
    curriculum_pdf: {
        type: DataTypes.STRING,
    },
    tecnology: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        isAlpha: true,
    },
    linkedin: {
        type: DataTypes.TEXT,
    },
    facebook: {
        type: DataTypes.TEXT,
    }
})

module.exports = Postulant;