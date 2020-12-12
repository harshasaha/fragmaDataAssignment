// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");
const route = require('./routes/routes');

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

    console.log('secure data '+config.secureData)
});