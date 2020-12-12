// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const route = require('./routes/routes');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const passport      = require('passport');

/**
 * App Variables
 */
const app = express();
app.use(bodyParser.json());
app.use(passport.initialize());

/**
 *  App Configuration
 */
var config = require('./config/'+(process.env.NODE_ENV || 'default').trim());
const port = config.port;


//DATABASE
const models = require("./models");
models.sequelize.authenticate().then(() => {
    console.log('Connected to SQL database');
})
.catch(err => {
    console.log('Unable to connect to SQL database', err);
});

/**
 * Routes Definitions
 */
app.use('/', route);

app.use('/', function(req, res){
	res.statusCode = 500; //send the appropriate status code
    res.json({status:false, message:"Requested method not found."});
});

/**
 * Server Activation
 */
app.listen(port, () => {
    console.log(`Listening to requests on ${config.host}${port}`);
});