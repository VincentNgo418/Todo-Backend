// routes/journalRatings.js
// JournalRatings route logic will go here.
const express = require('express');
const router = express.Router();
const journalRatingController = require('../controllers/journalRatingController');

router.get('/by-journal/:journalId', journalRatingController.getByJournal);
router.post('/', journalRatingController.create);
router.put('/:id', journalRatingController.update);

module.exports = router;