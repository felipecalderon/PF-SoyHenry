const User = require('./userModel');
const Postulant = require('./postulantModel');
const Admin = require('./adminModel');
const Company = require('./companyModel');
const Offers = require('./offersModel');

Postulant.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Postulant, { foreignKey: 'userId' });

Admin.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Admin, { foreignKey: 'userId' });

Company.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Company, { foreignKey: 'userId' });

Offers.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Offers, { foreignKey: 'userId' });

module.exports = { User, 
    Postulant, 
    Admin, 
    Company,
    Offers 
}