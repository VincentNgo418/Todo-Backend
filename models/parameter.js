// models/parameter.js
// Parameter model logic will go here.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize-connection');

class Parameter extends Model {}

Parameter.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    scale: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pathId: {
        type: DataTypes.INTEGER,
        references: { model: 'Paths', key: 'id' },
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Parameter',
});

module.exports = Parameter;