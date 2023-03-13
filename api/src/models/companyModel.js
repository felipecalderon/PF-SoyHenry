const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // otros campos específicos de Company
});

Company.belongsTo(User, { foreignKey: 'roleId' });

module.exports = Company