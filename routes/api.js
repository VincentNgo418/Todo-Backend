// routes/api.js
// Main API router logic will go here.
const express = require('express');
const router = express.Router();

// Diagnostic middleware: log incoming requests
router.use((req, res, next) => {
    console.log('Incoming Request:', {
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        body: req.body
    });
    next();
});

// Diagnostic middleware: log outgoing responses
router.use((req, res, next) => {
    const originalJson = res.json;
    res.json = function (data) {
        console.log('Outgoing Response:', {
            status: res.statusCode,
            body: data
        });
        return originalJson.call(this, data);
    };
    next();
});

const dayRoutes = require('./days');
const missionRoutes = require('./missions');
const goalRoutes = require('./goals');
const pathRoutes = require('./paths');
const parameterRoutes = require('./parameters');
const journalRoutes = require('./journals');
const highlightRoutes = require('./highlights');
const drawingRoutes = require('./drawings');
const journalRatingRoutes = require('./journalRatings');
const noteRoutes = require('./notes');

router.use('/days', dayRoutes);
router.use('/missions', missionRoutes);
router.use('/goals', goalRoutes);
router.use('/paths', pathRoutes);
router.use('/parameters', parameterRoutes);
router.use('/journals', journalRoutes);
router.use('/highlights', highlightRoutes);
router.use('/drawings', drawingRoutes);
router.use('/journalRatings', journalRatingRoutes);
router.use('/notes', noteRoutes);

// Simple echo endpoint for testing
router.get('/echo', (req, res) => {
    res.json({ message: 'Echo from API!' });
});

module.exports = router;