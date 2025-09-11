// models/journalRating.js
// JournalRating model logic will go here.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize-connection');

class JournalRating extends Model {}

JournalRating.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    parameterId: {
        type: DataTypes.INTEGER,
        references: { model: 'Parameters', key: 'id' },
        allowNull: false,
    },
    journalId: {
        type: DataTypes.INTEGER,
        references: { model: 'Journals', key: 'id' },
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'JournalRating',
});

module.exports = JournalRating;