const User = require('./userModel');
const Postulant = require('./postulantModel');
const Admin = require('./adminModel');
const Company = require('./companyModel');
const Offers = require('./offersModel');

Postulant.belongsTo(User, { foreignKey: 'userId' });
Admin.belongsTo(User, { foreignKey: 'userId' });
Company.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Company, { foreignKey: 'userId' });

Offers.belongsTo(User, { foreignKey: 'userId' })

module.exports = { User, 
    Postulant, 
    Admin, 
    Company,
    Offers 
}