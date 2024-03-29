const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database');

const Postulant = sequelize.define('Postulant', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    document: {
        type: DataTypes.STRING,
        unique: true,
    },
    description_postulant:{
        type: DataTypes.TEXT,
    },
    age: {
        type: DataTypes.STRING,
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
    title: {
        type: DataTypes.STRING,
    },
    languages: {
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