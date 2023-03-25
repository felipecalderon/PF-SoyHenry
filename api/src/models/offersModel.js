const { DataTypes } = require('sequelize');
const { DateTime } = require('luxon');
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
    date_post : {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get() {
            const value = this.getDataValue('date_post');
            return DateTime.fromJSDate(value).toFormat('dd/MM/yyyy HH:mm:ss'); // usa la fecha actual y la guarda al hacer el post ( de esta forma se actualiza )
        },
    },
    requeriments:{
        type: DataTypes.STRING,
    },
    functions:{
        type: DataTypes.STRING,
    },
    benefits:{
        type: DataTypes.STRING,
    },
    modality: {
        type: DataTypes.ENUM('fully_remote', 'remote_local', 'hybrid', 'no_remote')
    },
    perks:{
        type: DataTypes.ARRAY(DataTypes.STRING),
    },
    experience:{
        type: DataTypes.ENUM('0', '1', '2-4', '5'),
    },
    min_salary:{
        type: DataTypes.INTEGER,
    },
    max_salary:{
        type: DataTypes.INTEGER,
    },
    applications_count:{
        type: DataTypes.INTEGER,
    },
    bd_create:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    active:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    idRecruiterOfferCreate:{
        type: DataTypes.STRING,
    },
    idAplicants:{
        type: DataTypes.ARRAY(DataTypes.STRING),
    }
});

module.exports = Offers