'use strict';
if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
    require('dotenv').config();
}
//=============================================================================
/**
 * Module dependencies
 */
    //=============================================================================
const
    express = require('express'),
    bParser = require('body-parser'),
    mongoose = require('mongoose');


//=============================================================================
/**
 * express instance
 */
    //=============================================================================
const app = express();
//=============================================================================
/**
 * Module variables
 */
    //=============================================================================
const
    port = process.env.PORT,
    env = process.env.NODE_ENV,
    DBURL = process.env.DBURL;
const routes = require('./routes/userRoutes.js');
let db;

//=============================================================================
/**
 * App config
 */
//=============================================================================
app.set('port', port);
app.set('env', env);

app.use(bParser.json());
app.use(bParser.urlencoded({extended: true}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

var promiselib = require('bluebird');
promiselib.config({
    warnings: true,
    longStackTraces: true,
    cancellation: true,
    monitoring: true
});

var options = {promiseLibrary: promiselib, keepAlive: 1, connectTimeoutMS: 120000, socketTimeoutMS: 120000};

mongoose.connect(DBURL, options);

db = mongoose.connection;
db.on('error', err => {
    console.log(`There was a db connection error ${err}`);
    process.exit(1);
});
db.once('connected', () => {
    console.log('Successfully connected to ' + DBURL);
});
db.once('disconnected', () => {
    console.log('Successfully disconnected from ' + DBURL);
    process.exit(1);
});
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('dBase connection closed due to app termination');
        process.exit(0);
    });
});

app.get('/test', (req, res) => {
    return res.status(200).json('OK');
});

app.use('/userManagement', routes);

//=============================================================================
module.exports = app;
//=============================================================================
