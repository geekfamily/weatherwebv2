var forecastio = require('./forecastio'),
    conf = require('../../config/serverconfig');

var weatherSvc = {
    current: function (req, res) {
        forecastio.getForecast.get([conf.get('locationLong'),conf.get('locationLat')], function (err, weather) {
            if (err) return console.dir(err);
            var result = {'icon':weather.currently.icon, 'summary':weather.currently.summary};
            res.type('application/json').status(200).send({metadata: {}, result: result});
        });
    }
};

exports.weatherSvc = weatherSvc;