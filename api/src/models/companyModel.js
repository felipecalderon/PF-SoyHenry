const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database');

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description:{
    type: DataTypes.TEXT,
  },
  location:{
    type: DataTypes.STRING,
  },
  phone:{
    type: DataTypes.STRING,
  },
  website:{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  logo:{
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    },
  },
});

module.exports = Company