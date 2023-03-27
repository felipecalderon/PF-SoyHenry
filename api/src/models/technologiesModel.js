const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database');

const Technologies = sequelize.define('Technologies', {
    Technology: {
        type: DataTypes.STRING,
        allowNull: true,
      },      
})

module.exports = Technologies