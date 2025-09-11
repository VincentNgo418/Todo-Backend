// controllers/drawingController.js
// Controller logic for drawings will go here.
const Drawing = require('../models/drawing');

exports.createNew = async (req, res) => {
    try {
        const newDrawing = await Drawing.create(req.body);
        res.status(201).json(newDrawing);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const [updated] = await Drawing.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedDrawing = await Drawing.findByPk(req.params.id);
            res.status(200).json(updatedDrawing);
        } else {
            res.status(404).json({ error: 'Drawing not found.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const result = await Drawing.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Drawing not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete drawing.' });
    }
};

exports.getByJournal = async (req, res) => {
    try {
        const { journalId } = req.params;
        const drawings = await Drawing.findAll({ where: { journalId } });
        res.status(200).json(drawings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve drawings for journal.' });
    }
};

exports.getByNotes = async (req, res) => {
    try {
        const { noteId } = req.params;
        const drawings = await Drawing.findAll({ where: { noteId } });
        res.status(200).json(drawings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve drawings for notes.' });
    }
};