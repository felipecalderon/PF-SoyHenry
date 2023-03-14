const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Offers = sequelize.define('Offers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.STRING,
    },
    benefits:{
        type: DataTypes.STRING,
    },
    perks:{
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    min_salary:{
        type: DataTypes.INTEGER,
    },
    max_salary:{
        type: DataTypes.INTEGER,
    },
    modality: {
        type: DataTypes.ENUM('Remoto', 'Hybrido', 'Presencial')
    },
    applications_count:{
        type: DataTypes.INTEGER,
    },
    bd_create:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Offers