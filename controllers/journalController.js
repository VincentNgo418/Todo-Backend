// controllers/journalController.js
// Controller logic for journals will go here.
const Journal = require('../models/journal');
const { Op } = require('sequelize');

exports.getbyDay = async (req, res) => {
    try {
        const { dayId } = req.params;
        const journal = await Journal.findOne({
            where: {
                dayId: Number(dayId)
            }
        });
        if (journal) {
            res.status(200).json(journal);
        } else {
            res.status(404).json({ error: 'Journal not found for this day.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve journal.' });
    }
};

exports.getAll = async (req, res) => {
    try {
        const journals = await Journal.findAll();
        res.status(200).json(journals);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve journals.' });    
    }
};

exports.getbyID = async (req, res) => {
    try {
        const journal = await Journal.findByPk(req.params.id);
        if (journal) {
            res.status(200).json(journal);
        } else {
            res.status(404).json({ error: 'Journal not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve journal.' });
    }
};

exports.update = async (req, res) => {
    try {
        const [updated] = await Journal.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedJournal = await Journal.findByPk(req.params.id);
            res.status(200).json(updatedJournal);
        } else {
            res.status(404).json({ error: 'Journal not found.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createNew = async (req, res) => {
    try {
        const { text, dayId } = req.body;
        const newJournal = await Journal.create({ text, dayId });
        res.status(201).json(newJournal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};