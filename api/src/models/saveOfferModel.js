const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const SaveOffer = sequelize.define('SaveOffer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
});

module.exports = SaveOffer;