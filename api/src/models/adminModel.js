const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  aptitudes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usuarios: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  empresas: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  publicaciones: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM("Admin", "Postulante", "Empresa"),
    allowNull: false,
  },
  activo:{
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  // otros campos específicos de Admin
});

module.exports = Admin