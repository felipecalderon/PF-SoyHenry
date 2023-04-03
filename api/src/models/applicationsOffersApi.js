const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const applicationsOffersApi = sequelize.define('applicationsOffersApi', {
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

module.exports = applicationsOffersApi;