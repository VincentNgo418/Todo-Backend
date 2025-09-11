// models/drawing.js
// Drawing model logic will go here.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize-connection');

class Drawing extends Model {}

Drawing.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    location: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    journalId: {
        type: DataTypes.INTEGER,
        references: { model: 'Journals', key: 'id' },
        allowNull: true, // Can be null if associated with a note
    },
    noteId: {
        type: DataTypes.INTEGER,
        references: { model: 'Notes', key: 'id' },
        allowNull: true, // Can be null if associated with a journal
    },
}, {
    sequelize,
    modelName: 'Drawing',
});

module.exports = Drawing;