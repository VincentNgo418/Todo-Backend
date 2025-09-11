// routes/paths.js
// Paths route logic will go here.
const express = require('express');
const router = express.Router();
const pathController = require('../controllers/pathController');

router.get('/', pathController.getAll);
router.get('/:id', pathController.getbyID);
router.post('/', pathController.create);

module.exports = router;