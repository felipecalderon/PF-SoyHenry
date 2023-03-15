const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database');

const Admin = sequelize.define('Admin', {
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
}); 

module.exports = Admin