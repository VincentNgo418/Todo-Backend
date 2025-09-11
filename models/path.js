// models/path.js
// Path model logic will go here.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize-connection');

class Path extends Model {}

Path.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING, // Storing as a string (e.g., "r,g,b") is often easier than separate integers.
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Path',
});

module.exports = Path;