const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database');

const Review = sequelize.define('Review', {
  id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
  },
  usuario:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  comentario:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  puntuacion:{
    type: DataTypes.INTEGER,
    allowNull: false,
},
active:{
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

}); 

module.exports = Review