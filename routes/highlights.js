// routes/highlights.js
// Highlights route logic will go here.
const express = require('express');
const router = express.Router();
const highlightController = require('../controllers/highlightController');

router.post('/', highlightController.createNew);
router.get('/by-journal/:journalId', highlightController.getByJournal);
router.delete('/:id', highlightController.delete);

module.exports = router;