// routes/missions.js
const express = require('express');
const router = express.Router();
const repeatingMissionController = require('../controllers/repeatingMissionController');

router.get('/all', repeatingMissionController.getAll);
router.post('/', repeatingMissionController.create);
router.put('/:id', repeatingMissionController.update);
router.delete('/:id', repeatingMissionController.delete);
module.exports = router;