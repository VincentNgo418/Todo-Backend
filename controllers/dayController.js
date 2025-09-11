// controllers/dayController.js
// Controller logic for days will go here.
const Day = require('../models/day');
const Journal = require('../models/journal');
const Parameter = require('../models/parameter');
const Mission = require('../models/mission');
const { Op } = require('sequelize');

exports.renderDay = async (req, res) => {
    try {
        const { date } = req.query;
        // Trim the date string to remove any unexpected characters or whitespace
        const cleanDate = date.trim(); 
        let day = await Day.findOne({ where: { date: { [Op.like]: `${cleanDate}%` } } });
        
        
        if (!day) {
            day = await Day.create({ date: `${cleanDate}` });
            await Journal.create({ dayId: day.id, text: '' });
        }
        const missionsDueDate = await Mission.findAll({ where: { dueDate: { [Op.like]: `${cleanDate}%` } } });   
        const missionsWithoutDueDate = await Mission.findAll({ where: { dueDate: null } });

        res.status(200).json({ day, missionsDueDate, missionsWithoutDueDate });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllDays = async (req, res) => {
    try {
        // Assuming you have a Day model set up
        const days = await Day.findAll();
        res.status(200).json(days);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve days.' });
    }
};

exports.create = async (req, res) => {
    try {
        const dataToCreate = { ...req.body };
        
        const newDay = await Day.create({date: `${dataToCreate.date}`});
        res.status(201).json(newDay);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteDay = async (req, res) => {
    try {
        const result = await Day.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Day not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete day.' });
    }
}
