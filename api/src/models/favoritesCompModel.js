const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const FavoritesComp = sequelize.define('FavoritesComp', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
});

module.exports = FavoritesComp;