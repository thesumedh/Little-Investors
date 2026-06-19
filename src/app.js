// Import
const express = require('express');
const route = require('./routes/route');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files
app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/img', express.static(path.join(__dirname, '../img')));
app.use('/js', express.static(path.join(__dirname, '../js')));

// Set Views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', route);

module.exports = app;
