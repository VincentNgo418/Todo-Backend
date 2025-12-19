// routes/journals.js
// Journals route logic will go here.
const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');

router.get('/by-day/:dayId', journalController.getbyDay);
router.get('/:id', journalController.getbyID);
router.get('/', journalController.getAll);
router.post('/', journalController.createNew);
router.put('/:id', journalController.update);
module.exports = router;