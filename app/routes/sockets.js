// Define the routes module' method
module.exports = function(app) {

  socketio.on('connection', function (socket) {
    socketRef = socket;

  });


};