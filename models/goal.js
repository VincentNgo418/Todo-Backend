// models/goal.js
// Goal model logic will go here.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize-connection');

class Goal extends Model {}

Goal.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    details: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pathId: {
        type: DataTypes.INTEGER,
        references: { model: 'Paths', key: 'id' },
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Goal',
});

module.exports = Goal;