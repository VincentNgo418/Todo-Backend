// server.js

const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const { syncDatabase } = require('./index');
const fs = require('fs');
const https = require('https');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    if(token !== process.env.AUTH_KEY) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();



}

// API Routes
app.use('/api', authMiddleware, apiRoutes);

const SSL_OPTIONS = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt'),
};

// Start the server and sync the database
syncDatabase().then(() => {
    https.createServer(SSL_OPTIONS, app).listen(PORT, () => {
        console.log(`Server is running securely on https://localhost:${PORT}`);
    });
});