// models/highlight.js
// Highlight model logic will go here.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize-connection');

class Highlight extends Model {}

Highlight.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    startIndex: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    endIndex: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    journalId: {
        type: DataTypes.INTEGER,
        references: { model: 'Journals', key: 'id' },
        allowNull: false,
    },
    pathId: {
        type: DataTypes.INTEGER,
        references: { model: 'Paths', key: 'id' },
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Highlight',
});

module.exports = Highlight;