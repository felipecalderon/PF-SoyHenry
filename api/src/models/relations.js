const User = require('./userModel');
const Postulant = require('./postulantModel');
const Admin = require('./adminModel');
const Company = require('./companyModel');
const Offers = require('./offersModel');
const Technologies = require('./technologiesModel')

Postulant.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Postulant, { foreignKey: 'userId' });

Admin.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Admin, { foreignKey: 'userId' });

Company.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Company, { foreignKey: 'userId' });

Offers.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Offers, { foreignKey: 'userId' });

Offers.belongsTo(Company, { foreignKey: 'idRecruiterOfferCreate', onDelete: 'CASCADE' });
Company.hasMany(Offers, { foreignKey: 'idRecruiterOfferCreate' });

Postulant.belongsTo(Offers, { foreignKey: 'idAplicants', onDelete: 'CASCADE' });
Offers.hasMany(Postulant, { foreignKey: 'idAplicants' });

Technologies.hasMany(Offers, { foreignKey: 'idOffers', onDelete: 'CASCADE' })
Offers.hasMany(Technologies, { foreignKey: 'idOffers'});

Technologies.hasMany(Postulant, {foreignKey: 'idPostulant', onDelete: 'CASCADE'})
Postulant.hasMany(Technologies, {foreignKey: 'idPostulant'})

module.exports = { User, 
    Postulant,
    Admin, 
    Company,
    Offers,
    Technologies 
}