'use strict';

var config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');

// Define the Express configuration method
module.exports = function() {
	// Create a new Express application instance
	var app = express();

	// Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
	if (process.env.NODE_ENV === 'development') {
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	// Use the 'body-parser' and 'method-override' middleware functions
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// Set the application view engine and 'views' folder
	app.set('views', './app/views');
	app.set('view engine', 'jade');

	// Load the routing files
  require('../routes/records.js')(app);
	require('../routes/index.js')(app);

	// Configure static file serving
	app.use(express.static('./client'));

	// Return the Express application instance
	return app;


	// Create a new Express application instance
	var app = express();

	var http = require('http');
	var httpServer = http.Server(app);
	var io = require('socket.io')(httpServer);
	var socketHelper = require('./app/services/socketservice');

	httpServer.listen(port, function(){
		socketHelper.setSocket(io);
		console.log("server listening on port: ", port);
	});

// Use the module.exports property to expose our Express application instance for external usage
	module.exports = app;


};
