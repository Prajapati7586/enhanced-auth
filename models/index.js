
const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  googleId: Sequelize.STRING,
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  photo: Sequelize.STRING,
  bio: Sequelize.TEXT,
  phone: Sequelize.STRING,
  password: Sequelize.STRING,
  isPrivate: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  role:{
    type: Sequelize.ENUM('NORMAL', 'ADMIN'), // Only allow 'NORMAL' or 'ADMIN' as role values
    defaultValue: 'NORMAL', // Set the default role to 'NORMAL'
    allowNull: false,
  },
});

module.exports = {
  User,
};
