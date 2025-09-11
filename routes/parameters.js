// routes/parameters.js
// Parameters route logic will go here.
const express = require('express');
const router = express.Router();
const parameterController = require('../controllers/parameterController');

router.get('/', parameterController.getAll);
router.post('/', parameterController.create);
router.delete('/:id', parameterController.delete);

module.exports = router;