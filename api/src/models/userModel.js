const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM("Admin", "Postulante", "Empresa"),
    allowNull: false,
  },
  active:{
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User