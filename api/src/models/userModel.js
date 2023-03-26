const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database');
const {hashSync, genSaltSync} = require('bcrypt')
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM("Admin", "Postulante", "Empresa"),
    allowNull: false,
  },
  active:{
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  state_aplication:{
      type: DataTypes.INTEGER,
  },
});

User.beforeCreate((user) => {
  const hashedPassword = hashSync(user.password, genSaltSync(10));
  user.password = hashedPassword;
});

module.exports = User