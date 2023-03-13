const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  // otros campos específicos de Admin
});

Admin.belongsTo(User, { foreignKey: 'roleId' });

module.exports = Admin