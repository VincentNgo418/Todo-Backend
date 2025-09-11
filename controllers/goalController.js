// controllers/goalController.js
// Controller logic for goals will go here.
const Goal = require('../models/goal');

exports.getAll = async (req, res) => {
    try {
        const goals = await Goal.findAll();
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve goals.' });
    }
};

exports.getGoalbyPath = async (req, res) => {
    try {
        const { pathId } = req.params;
        const goals = await Goal.findAll({ where: { pathId } });
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve goals by path.' });
    }
};

exports.getbyID = async (req, res) => {
    try {
        const goal = await Goal.findByPk(req.params.id);
        if (goal) {
            res.status(200).json(goal);
        } else {
            res.status(404).json({ error: 'Goal not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve goal.' });
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const [updated] = await Goal.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedGoal = await Goal.findByPk(req.params.id);
            res.status(200).json(updatedGoal);
        } else {
            res.status(404).json({ error: 'Goal not found.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newGoal = await Goal.create(req.body);
        res.status(201).json(newGoal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
