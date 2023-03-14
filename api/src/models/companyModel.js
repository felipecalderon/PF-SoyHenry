const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

// datos empresa: name, description, location
const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = Company