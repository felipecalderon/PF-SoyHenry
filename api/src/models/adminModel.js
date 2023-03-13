const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // otros campos específicos de Admin
});

module.exports = Admin