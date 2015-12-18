'use strict';

var request = require('request'),
  _ = require('lodash'),
  q = require('q'),
  extend = require('extend'),
  conf = require('../../config/serverconfig'),
  spark = require('spark');

function login(){
  return spark.login({ username: conf.get('username'), password: conf.get('password') });
}

exports.getDevices = function (options, done) {
  login().then(
    function(token){
      // If login is successful we get and accessToken,
      // we'll use that to call Spark API ListDevices

      var devicesPr = spark.listDevices();

      devicesPr.then(
        // We get an array with devices back and return that to the calling function
        function(devices){
          return done(devices);
        },
        function(err) {
          console.log('API call List Devices completed on promise fail: ', err);
          return err;
        }
      );

    },
    function(err) {
      console.log('API call completed on promise fail: ', err);
    }
  );
}

//variables
exports.callFunction = function (options, done) {
  login().then(
    function(token){
      spark.getVariable(conf.get('deviceId'), options.functionName, done);
    }
  );
}

//functions
exports.runFunction = function (options, done) {
  login().then(
    function(token){
      spark.callFunction(conf.get('deviceId'), options.functionName, options.pin+':'+options.value, done);
    }
  );
}

exports.eventListen = function (options, done) {

  login().then(
    function(token){
      spark.getEventStream(options.eventName, conf.get('deviceId'), function(data) {
          return done("",data);
      });
    }
  );

  return;
}
