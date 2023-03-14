const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Postulant = sequelize.define('Postulant', {
  id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
  },
  nombres:{
      type: DataTypes.STRING,
      isAlpha:true,
  },
  apellidos:{
      type: DataTypes.STRING,
      isAlpha:true,
  },
  celular:{
      type: DataTypes.INTEGER,
      unique: true,
  },
  discapacidad:{
      type: DataTypes.STRING,
      isAlpha:true,
  },
  genero:{
      type: DataTypes.ENUM('Femenino', 'Masculino', 'Prefiero no decirlo'),
  },
})

module.exports = Postulant;