// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");

/**
 * App Variables
 */
const app = express();

/**
 *  App Configuration
 */
var config = require('./config/'+(process.env.NODE_ENV || 'default').trim());
const port = config.port;

/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
    res.status(200).send("started");
});

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on ${config.host}${port}`);
    
    console.log('secure data '+config.secureData)
});