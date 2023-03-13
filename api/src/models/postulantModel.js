const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');
const User = require('./user');

const Postulant = sequelize.define('Postulant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // otros campos específicos de Postulant
});

Postulant.belongsTo(User, { foreignKey: 'roleId' });

module.exports = Postulant;