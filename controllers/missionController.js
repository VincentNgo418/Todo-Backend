// controllers/missionController.js
const Mission = require('../models/mission');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
    try {
        const missions = await Mission.findAll();
        res.status(200).json(missions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve missions.' });
    }
};

exports.getMissionsbyDueDate = async (req, res) => {
    try {
        const { dueDate } = req.params;
        const missions = await Mission.findAll({
            where: {
                dueDate: {
                    [Op.like]: `${dueDate}%`
                }
            }
        });
        res.status(200).json(missions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve missions by due date.' });
    }
};

exports.getMissionsWithoutDueDate = async (req, res) => {
    try {
        const missions = await Mission.findAll({ where: { dueDate: null } });
        res.status(200).json(missions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve missions without a due date.' });
    }
};

exports.getMissionsbyGoal = async (req, res) => {
    try {
        const { goalId } = req.params;
        const missions = await Mission.findAll({ where: { goalId } });
        res.status(200).json(missions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve missions by goal.' });
    }
};

exports.getMissionsbyPath = async (req, res) => {
    try {
        const { pathId } = req.params;
        const missions = await Mission.findAll({ where: { pathId } });
        res.status(200).json(missions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve missions by path.' });
    }
};

exports.massCreateMission = async (req, res) => {
    try {
        const newMissions = await Mission.bulkCreate(req.body.missions);
        res.status(201).json(newMissions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateMission = async (req, res) => {
    try {
        const [updated] = await Mission.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedMission = await Mission.findByPk(req.params.id);
            res.status(200).json(updatedMission);
        } else {
            res.status(404).json({ error: 'Mission not found.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.markComplete = async (req, res) => {
    try {
        const [updated] = await Mission.update({ done: true }, {
            where: { id: req.params.id, done: false }
        });
        if (updated) {
            res.status(200).json({ message: 'Mission marked as complete.' });
        } else {
            res.status(404).json({ error: 'Mission not found or already complete.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark mission complete.' });
    }
};

exports.markIncomplete = async (req, res) => {
    try {
        const [updated] = await Mission.update({ done: false }, {
            where: { id: req.params.id, done: true }
        });
        if (updated) {
            res.status(200).json({ message: 'Mission marked as incomplete.' });
        } else {
            res.status(404).json({ error: 'Mission not found or already incomplete.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark mission incomplete.' });
    }
};

exports.getbyID = async (req, res) => {
    try {
        const mission = await Mission.findByPk(req.params.id);
        if (mission) {
            res.status(200).json(mission);
        } else {
            res.status(404).json({ error: 'Mission not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve mission.' });
    }
};

exports.deleteMission = async (req, res) => {
    try {
        const deleted = await Mission.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(200).json({ message: 'Mission deleted successfully.' });
        } else {
            res.status(404).json({ error: 'Mission not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete mission.' });
    }
};