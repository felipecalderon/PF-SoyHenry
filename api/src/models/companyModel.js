const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database');

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  // username: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // lastnames: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  companyname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // email: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // password: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  //   unique: true,
  // },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: false,
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