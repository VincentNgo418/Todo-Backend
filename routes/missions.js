// routes/missions.js
const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController');

router.get('/', missionController.getAll);
router.get('/by-due-date/:dueDate', missionController.getMissionsbyDueDate);
router.get('/without-due-date', missionController.getMissionsWithoutDueDate);
router.get('/by-goal/:goalId', missionController.getMissionsbyGoal);
router.get('/by-path/:pathId', missionController.getMissionsbyPath);
router.get('/:id', missionController.getbyID);
router.post('/mass-create', missionController.massCreateMission);
router.put('/:id', missionController.updateMission);
router.put('/:id/complete', missionController.markComplete);
router.put('/:id/incomplete', missionController.markIncomplete);
router.delete('/:id', missionController.deleteMission);
module.exports = router;