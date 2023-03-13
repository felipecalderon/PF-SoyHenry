const User = require('./userModel');
const Postulant = require('./postulantModel');
const Admin = require('./adminModel');

Postulant.belongsTo(User, { foreignKey: 'roleId' });
Admin.belongsTo(User, { foreignKey: 'roleId' });

module.exports = { User, Postulant, Admin}