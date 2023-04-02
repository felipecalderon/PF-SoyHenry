const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const SaveOfferApi = sequelize.define('SaveOfferApi', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.STRING,
    },
    offerId: {
        type: DataTypes.STRING,
    },
    title: {
        type: DataTypes.STRING,
    },
});

module.exports = SaveOfferApi;