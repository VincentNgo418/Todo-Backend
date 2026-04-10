const repeatingMission = require('../models/repeatingMission');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
    try {
        const {defined, since} = req.query;
        const whereClause = {};

        if (defined !== undefined) {
            whereClause.defined = defined === 'true';
        }

        if(since) {
            whereClause.createdDate = {
                [Op.gte]: new Date(since)
            };

        }

        const missions = await repeatingMission.findAll({where: whereClause, order: [['createdAt','DESC']]});
        res.status(200).json(missions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve repeating missions.' });
    }
};




    
exports.create = async (req, res) => {
    try {
        const newRepeatingMission = await repeatingMission.create(req.body);
        res.status(201).json(newRepeatingMission);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const [updated] = await repeatingMission.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedRepeatingMission = await repeatingMission.findByPk(req.params.id);
            res.status(200).json(updatedRepeatingMission);
        } else {
            res.status(404).json({ error: 'Repeating mission not found.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
    
exports.delete = async (req, res) => {
    try {
        const deleted = await repeatingMission.destroy({ where: { id: req.params.id } });
        if (deleted) {
            res.status(200).json({ message: 'Repeating mission deleted successfully.' });
        } else {
            res.status(404).json({ error: 'Repeating mission not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete repeating mission.' });
    }
};