// server.js

const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const { syncDatabase } = require('./index');
const fs = require('fs');
const https = require('https');

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
    next();



}

// API Routes
app.use('/api', apiRoutes);

const SSL_OPTIONS = {
    key: fs.readFileSync('/etc/letsencrypt/live/YOUR_DOMAIN/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/YOUR_DOMAIN/fullchain.pem'),
};

// Start the server and sync the database
syncDatabase().then(() => {
    https.createServer(SSL_OPTIONS, app).listen(80, () => {
        console.log('Server is running securely on https://YOUR_DOMAIN');
    });
});