// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var	config = require('./config');
var mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function() {
	// Use Mongoose to connect to MongoDB
	var db = mongoose.connect(process.env.MONGOLAB_URI, function (error) {
        if (error) console.error(error);
        else console.log('mongo connected');
    });

	// Load the 'Record' model
	require('./../models/record.model.js');

	// Return the Mongoose connection instance
	return db;
};
