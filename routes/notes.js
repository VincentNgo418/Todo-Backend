// routes/notes.js
// Notes route logic will go here.
const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.post('/', noteController.create);
router.put('/:id', noteController.update);
router.delete('/:id', noteController.delete);

module.exports = router;