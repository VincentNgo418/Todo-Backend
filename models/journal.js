// models/journal.js
// Journal model logic will go here.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize-connection');

class Journal extends Model {}

Journal.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    text: {
        type: DataTypes.TEXT, // Use TEXT for long journal entries
        allowNull: false,
    },
    dayId: {
        type: DataTypes.INTEGER,
        references: { model: 'Days', key: 'id' },
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Journal',
});

module.exports = Journal;