const sequelize = require('../database');
const { DataTypes } = require('sequelize');

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

module.exports = Aplications;