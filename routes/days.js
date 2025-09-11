// routes/days.js
// Days route logic will go here.
const express = require('express');
const router = express.Router();
const dayController = require('../controllers/dayController');

router.get('/render', dayController.renderDay);

// New route to get all day objects
router.get('/all', dayController.getAllDays);
router.post('/', dayController.create);
router.delete('/:id', dayController.deleteDay);

module.exports = router;