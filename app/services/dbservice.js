'use strict';

var Record = require('mongoose').model('Record'),
  socketRef;


function createRecord(record){
    socketio.on('connection', function (socket) {
        socketRef = socket;
        emit("socket_status", {msg:"success"});
    });
}

function emit(eventName, data, callback) {
    socketRef.emit(eventName, data, function () {
        var args = arguments;
    });
}

var weatherSvc = {
    current: function (req, res) {
        var q = Record.findOne().sort({'created':-1});
        q.exec(function(err, data){
            if (err){
                throw err;
            } else {
                res.json(data);
            }
        });
    }
};

function getSocket(){
    return socket;
}

exports.createRecord = createRecord;
exports.getSocket = getSocket;
exports.emit = emit;
exports.weatherSvc = weatherSvc;