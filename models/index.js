
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
  isPrivate: Sequelize.BOOLEAN,
  role: Sequelize.STRING,
});

// Add any associations here if needed

module.exports = {
  User,
};
