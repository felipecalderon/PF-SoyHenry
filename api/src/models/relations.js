const User = require('./userModel');
const Postulant = require('./postulantModel');
const Admin = require('./adminModel');
// const Offers = require('./offersModel');


Postulant.belongsTo(User, { foreignKey: 'userId' });
Admin.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, 
    Postulant, 
    Admin, 
    // Offers 
}