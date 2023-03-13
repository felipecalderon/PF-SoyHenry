const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Postulant = sequelize.define('Postulant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // otros campos específicos de Postulant
});

module.exports = Postulant;