const User = require('./userModel');
const Postulant = require('./postulantModel');
const Admin = require('./adminModel');
const Company = require('./companyModel');
const Offers = require('./offersModel');

Postulant.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Admin.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });

User.hasMany(Postulant, { foreignKey: 'userId' });
User.hasMany(Admin, { foreignKey: 'userId' });
User.hasMany(Company, { foreignKey: 'userId' });
// User.hasMany(Offers, { foreignKey: 'userId' });

Company.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Company.hasMany(Offers, { foreignKey: 'idRecruiterOfferCreate' });

Offers.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Offers.belongsTo(Company, { foreignKey: 'idRecruiterOfferCreate', onDelete: 'CASCADE' });

module.exports = { User, 
    Postulant,
    Admin, 
    Company,
    Offers 
}