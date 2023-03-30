const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database');
const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    inicio_plan: {
        type: DataTypes.DATEONLY,
    },
    fin_plan: {
        type: DataTypes.DATEONLY,
    },
    plan: {
        type: DataTypes.ENUM('Free', 'Premium'),
        defaultValue: 'Free',
        allowNull: false,
    },
});

module.exports = Payment;