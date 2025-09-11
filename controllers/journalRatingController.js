// controllers/journalRatingController.js
// Controller logic for journal ratings will go here.
const JournalRating = require('../models/journalRating');

exports.getByJournal = async (req, res) => {
    try {
        const { journalId } = req.params;
        const ratings = await JournalRating.findAll({ where: { journalId } });
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve journal ratings.' });
    }
};

exports.update = async (req, res) => {
    try {
        const [updated] = await JournalRating.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedRating = await JournalRating.findByPk(req.params.id);
            res.status(200).json(updatedRating);
        } else {
            res.status(404).json({ error: 'Journal rating not found.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        const newRating = await JournalRating.create(req.body);
        res.status(201).json(newRating);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};