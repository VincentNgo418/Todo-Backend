const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db/database.sqlite', // Path to your SQLite database file
  logging: false, // Set to true to see SQL queries in the console
});

module.exports = sequelize;