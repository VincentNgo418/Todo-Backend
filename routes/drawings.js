// routes/drawings.js
// Drawings route logic will go here.
const express = require('express');
const router = express.Router();
const drawingController = require('../controllers/drawingController');

router.post('/', drawingController.createNew);
router.put('/:id', drawingController.update);
router.delete('/:id', drawingController.delete);
router.get('/by-journal/:journalId', drawingController.getByJournal);
router.get('/by-notes/:noteId', drawingController.getByNotes);

module.exports = router;