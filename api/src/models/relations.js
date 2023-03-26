const User = require('./userModel');
const Postulant = require('./postulantModel');
const Admin = require('./adminModel');
const Company = require('./companyModel');
const Offers = require('./offersModel');
const sequelize = require('../database');
const { DataTypes } = require('sequelize');

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

const Aplications = sequelize.define('Aplications', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status:{
        type: DataTypes.ENUM('send', 'viewed', 'no_select', 'select')
    }
});

Aplications.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Aplications, { foreignKey: 'userId', onDelete: 'CASCADE' });

Aplications.belongsTo(Offers, { foreignKey: 'offerId', onDelete: 'CASCADE' });
Offers.hasMany(Aplications, { foreignKey: 'offerId', onDelete: 'CASCADE' });

const SaveOffer = sequelize.define('SaveOffer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
});

SaveOffer.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(SaveOffer, { foreignKey: 'userId', onDelete: 'CASCADE' });

SaveOffer.belongsTo(Offers, { foreignKey: 'offerId', onDelete: 'CASCADE' });
Offers.hasMany(SaveOffer, { foreignKey: 'offerId', onDelete: 'CASCADE' });

const FavoritesComp = sequelize.define('FavoritesComp', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
});

FavoritesComp.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(FavoritesComp, { foreignKey: 'userId', onDelete: 'CASCADE' });

FavoritesComp.belongsTo(Company, { foreignKey: 'companyId', onDelete: 'CASCADE' });
Company.hasMany(FavoritesComp, { foreignKey: 'companyId', onDelete: 'CASCADE' });

module.exports = {
    User,
    Postulant,
    Admin,
    Company,
    Offers,
    Aplications,
    SaveOffer,
    FavoritesComp,
}