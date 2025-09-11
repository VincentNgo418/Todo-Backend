// routes/goals.js
// Goals route logic will go here.
const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');

router.get('/', goalController.getAll);
router.get('/by-path/:pathId', goalController.getGoalbyPath);
router.get('/:id', goalController.getbyID);
router.put('/:id', goalController.updateGoal);
router.post('/', goalController.create);

module.exports = router;