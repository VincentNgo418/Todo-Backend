// controllers/parameterController.js
// Controller logic for parameters will go here.
const Parameter = require('../models/parameter');

exports.getAll = async (req, res) => {
    try {
        const parameters = await Parameter.findAll();
        res.status(200).json(parameters);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve parameters.' });
    }
};

exports.create = async (req, res) => {
    try {
        const newParameter = await Parameter.create(req.body);
        res.status(201).json(newParameter);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const result = await Parameter.destroy({
            where: { id: req.params.id }
        });
        if (result) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Parameter not found.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete parameter.' });
    }
};