const { DataTypes, Sequelize, UniqueConstraintError } = require('sequelize');
const sequelize = require('../database');

const Review = sequelize.define('Review', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  photo: {
    type: DataTypes.STRING,
  },
  idUser: {
    type: DataTypes.UUID,
    unique: true,
  },
  usuario: {
    type: DataTypes.STRING,
  },
  comentario: {
    type: DataTypes.TEXT,
  },
  puntuacion: {
    type: DataTypes.INTEGER,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },

});

module.exports = Review