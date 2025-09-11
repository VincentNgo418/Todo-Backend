// models/day.js
// Day model logic will go here.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize-connection');

class Day extends Model {}

Day.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Day',
});

module.exports = Day;