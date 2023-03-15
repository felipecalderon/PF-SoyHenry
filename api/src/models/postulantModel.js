const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database');

const Postulant = sequelize.define('Postulant', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
    names:{
        type: DataTypes.STRING,
        isAlpha:true,
    },
    lastnames:{
        type: DataTypes.STRING,
        isAlpha:true,
    },
    phone:{
        type: DataTypes.STRING,
        isNumeric: true, 
        unique: true,
    },
    disability:{
        type: DataTypes.STRING,
        isAlpha:true,
    },
    gender:{
        type: DataTypes.ENUM('Femenino', 'Masculino', 'Prefiero no decirlo'),
    },
})

module.exports = Postulant;