const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize-connection');

class Mission extends Model {}

Mission.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    details: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    urgency: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    priority: {
        type: DataTypes.FLOAT,
        allowNull: true,
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
    modelName: 'Mission',
});

module.exports = Mission;