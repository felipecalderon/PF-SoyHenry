const User = require('./userModel');
const Postulant = require('./postulantModel');
const Admin = require('./adminModel');
const Company = require('./companyModel');
const Offers = require('./offersModel');
const Aplications = require('./applicationModel');
const SaveOffer = require('./saveOfferModel');
const FavoritesComp = require('./favoritesCompModel');
const Technologies = require('./technologiesModel');
const Payment = require('./paymentModel');

Postulant.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Postulant, { foreignKey: 'userId' });

Admin.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Admin, { foreignKey: 'userId' });

Company.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Company, { foreignKey: 'userId' });

Offers.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Offers, { foreignKey: 'userId' });

Review.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Review, { foreignKey: 'userId' });

Offers.belongsTo(Company, { foreignKey: 'idRecruiterOfferCreate', onDelete: 'CASCADE' });
Company.hasMany(Offers, { foreignKey: 'idRecruiterOfferCreate' });

// Aplicaciones
Aplications.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(Aplications, { foreignKey: 'userId', onDelete: 'CASCADE' });

Aplications.belongsTo(Offers, { foreignKey: 'offerId', onDelete: 'CASCADE' });
Offers.hasMany(Aplications, { foreignKey: 'offerId', onDelete: 'CASCADE' });

// Guardar ofertas
SaveOffer.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(SaveOffer, { foreignKey: 'userId', onDelete: 'CASCADE' });

SaveOffer.belongsTo(Offers, { foreignKey: 'offerId', onDelete: 'CASCADE' });
Offers.hasMany(SaveOffer, { foreignKey: 'offerId', onDelete: 'CASCADE' });

// Empresas favoritas 
FavoritesComp.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
User.hasMany(FavoritesComp, { foreignKey: 'userId', onDelete: 'CASCADE' });

FavoritesComp.belongsTo(Company, { foreignKey: 'companyId', onDelete: 'CASCADE' });
Company.hasMany(FavoritesComp, { foreignKey: 'companyId', onDelete: 'CASCADE' });

Technologies.belongsToMany(Offers, { through: 'Technologies_Offers', onDelete: 'CASCADE' })
Offers.belongsToMany(Technologies, { through: 'Technologies_Offers'});

Technologies.hasMany(Postulant, {foreignKey: 'idPostulant', onDelete: 'CASCADE'})
Postulant.hasMany(Technologies, {foreignKey: 'idPostulant'})

// Pagos
Payment.belongsTo(Postulant);
Postulant.hasMany(Payment, { as: 'payments' });

module.exports = {
    User,
    Postulant,
    Admin,
    Company,
    
    Offers,
    Technologies,
    Aplications,
    SaveOffer,
    FavoritesComp,
    Payment
}