const { DataTypes } = require("sequelize")
const sequelize = require('../database');


const User = sequelize.define(
    'User', 
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombres:{
            type: DataTypes.STRING,
            isAlpha:true,
        },
        apellidos:{
            type: DataTypes.STRING,
            isAlpha:true,
        },
        celular:{
            type: DataTypes.INTEGER,
            unique: true,
        },
        correo:{
            type: DataTypes.STRING,
            isEmail:true,
            unique: true,
        },
        discapacidad:{
            type: DataTypes.STRING,
            isAlpha:true,
        },
        genero:{
            type: DataTypes.ENUM,
            values:["Femenino", "Masculino", "Prefiero no decirlo"]
        },
        estado:{
            type: DataTypes.ENUM,
            values:[ 0, 1 ],
            defaultValue: 1,
        }
    }
)

module.exports = User