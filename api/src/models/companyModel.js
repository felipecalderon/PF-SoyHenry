const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database');

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  companyname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_company: {
    type: DataTypes.STRING,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  phone_company: {
    type: DataTypes.STRING,
    unique: true,
  },
  website: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    },
  },
  logo: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    },
  },
  likes_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
});

module.exports = Company