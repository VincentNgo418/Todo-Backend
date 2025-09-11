// controllers/highlightController.js
// Controller logic for highlights will go here.
const Highlight = require('../models/highlight');

exports.createNew = async (req, res) => {
    try {
        const newHighlight = await Highlight.create(req.body);
        res.status(201).json(newHighlight);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getByJournal = async (req, res) => {
    try {
        const { journalId } = req.params;
        const highlights = await Highlight.findAll({ where: { journalId } });
        res.status(200).json(highlights);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve highlights.' });
    }
};

exports.delete = async (req, res) => {
    try {
        const result = await Highlight.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Highlight not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete highlight.' });
    }
};