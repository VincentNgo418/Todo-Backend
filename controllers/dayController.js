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
            day = await Day.create({ date: `${cleanDate}` , show: true});
            await Journal.create({ dayId: day.id, text: '' });
        }
        const missionsDueDate = await Mission.findAll({ where: { dueDate: { [Op.like]: `${cleanDate}%` }, defined:true } });   
        const missionsWithoutDueDate = await Mission.findAll({ where: { dueDate: null, defined: true } });

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
        
    // ensure `show` is set (model has defaultValue but set explicitly here to avoid DB errors
    // if the table was created without a default column value)
    const newDay = await Day.create({ date: `${dataToCreate.date}`, show: `${dataToCreate.show}` });
        res.status(201).json(newDay);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getActive = async (req, res) => {
    try {
        const {date} = req.query
        const cleanDate = date.trim(); 
        const currentDate = new Date(cleanDate);
        const previousDate = new Date(cleanDate);

        console.log(currentDate);
       

        previousDate.setDate(previousDate.getDate() - 1);
        console.log(previousDate);
        //hide previous days
        await Day.update({show: false}, {where: {date: {[Op.between] : [ previousDate, currentDate ]}}})
        
        //show current day
        await Day.update({show: true}, {where: {date: { [Op.like]: `${cleanDate}%` }}})
        
        const result = await Day.findAll({where: {show: true}});
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch active days"});
    }
}

exports.updateByDate = async (req, res) => {
    try {
        const dataToCreate = { ...req.body };
        // validate input
        if (!dataToCreate.date || typeof dataToCreate.date !== 'string') {
            return res.status(400).json({ error: 'Missing or invalid `date` in request body' });
        }

        const cleanDate = dataToCreate.date.trim();
        const show = !!dataToCreate.show; // coerce to boolean
        console.log(`Updating day with date: ${cleanDate} to show: ${show}`);

     
        const [upsertResult, created] = await Day.upsert({ date: `${cleanDate}`, show: show });
        res.status(201).json(upsertResult);
    } catch (error) {
        console.error('updateByDate error:', error);
        res.status(500).json({ error: error.message || 'Failed to update day' });
    }
};

exports.deleteDay = async (req, res) => {
    try {

        //hide previous days
        const { date } = req.query
        const cleanDate = date.trim(); 

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
