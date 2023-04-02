const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database');
const { hashSync, genSaltSync } = require('bcrypt')
const User = sequelize.define('User', {
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
  },
  lastnames: {
    type: DataTypes.STRING,
  },
  website: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  city: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  phone:{
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM("Admin", "Postulante", "Empresa"),
    allowNull: false,
  },
  premium:{
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

User.beforeCreate((user) => {
  const hashedPassword = hashSync(user.password, genSaltSync(10));
  user.password = hashedPassword;
});

module.exports = User