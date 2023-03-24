const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database');

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  username:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastnames:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyname:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  description:{
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location:{
    type: DataTypes.STRING,
    allowNull: false,
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
  active:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
}
});

module.exports = Company