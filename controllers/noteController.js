// controllers/noteController.js
// Controller logic for notes will go here.
const Note = require('../models/note');

exports.create = async (req, res) => {
    try {
        const newNote = await Note.create(req.body);
        res.status(201).json(newNote);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const [updated] = await Note.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedNote = await Note.findByPk(req.params.id);
            res.status(200).json(updatedNote);
        } else {
            res.status(404).json({ error: 'Note not found.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const result = await Note.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Note not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete note.' });
    }
};