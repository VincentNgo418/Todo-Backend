// routes/days.js
// Days route logic will go here.
const express = require('express');
const router = express.Router();
const dayController = require('../controllers/dayController');

router.get('/render', dayController.renderDay);

// New route to get all day objects
router.get('/all', dayController.getAllDays);
router.get('/active', dayController.getActive);
router.post('/', dayController.create);
router.put('/', dayController.updateByDate);
router.delete('/:id', dayController.deleteDay);

module.exports = router;