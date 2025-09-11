// models/note.js
// Note model logic will go here.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize-connection');

class Note extends Model {}

Note.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    goalId: {
        type: DataTypes.INTEGER,
        references: { model: 'Goals', key: 'id' },
        allowNull: true,
    },
    pathId: {
        type: DataTypes.INTEGER,
        references: { model: 'Paths', key: 'id' },
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'Note',
});

module.exports = Note;