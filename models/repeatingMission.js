// models/day.js
// Day model logic will go here.
const { Model, DataTypes } = require('sequelize');
const { RRule } = require('rrule');
const sequelize = require('../db/sequelize-connection');

class RepeatingMission extends Model {}

RepeatingMission.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    recurrenceRule: {
        type: DataTypes.TEXT,
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('recurrenceRule');
            return rawValue ? RRule.fromString(rawValue) : null;
        },
        set(value) {
            const stringValue = value instanceof RRule ? value.toString() : value;
            this.setDataValue('recurrenceRule', stringValue);
        }
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    details: {
        type: DataTypes.STRING,
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
    modelName: 'RepeatingMission',
});

module.exports = RepeatingMission;