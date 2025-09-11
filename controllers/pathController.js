// controllers/pathController.js
// Controller logic for paths will go here.
const Path = require('../models/path');

exports.getAll = async (req, res) => {
    try {
        const paths = await Path.findAll();
        res.status(200).json(paths);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve paths.' });
    }
};

exports.getbyID = async (req, res) => {
    try {
        const path = await Path.findByPk(req.params.id);
        if (path) {
            res.status(200).json(path);
        } else {
            res.status(404).json({ error: 'Path not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve path.' });
    }
}
    
exports.create = async (req, res) => {
    try {
        const newPath = await Path.create(req.body);
        res.status(201).json(newPath);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
