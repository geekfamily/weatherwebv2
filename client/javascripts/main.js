(function (global) {
  var io = global.io.connect()

  global.app = {
    onSocketEvent: function (event, cb) {
      io.on(event, cb)
    }
  }

  var currentOutlook = global.document.getElementById('currentOutlook');
  var currentIcon = global.document.getElementById('currentIcon');
  var currentWeather = global.document.getElementById('currentWeather');
  var tempTemp = global.document.getElementById('currentTemp');
  var tempRain = global.document.getElementById('currentRain');
  var tempWind = global.document.getElementById('currentWind');
  var tempHumid = global.document.getElementById('currentHumid');
  var color = "yellow";

  $.get('/api/weather/current').
    then(function(data) {
      updateData(data);
    }, function(response) {
      response.toString();
    });

  $.get('/api/weatherio/current').
    then(function(data) {
      weatherioSuccess(data.result);
    }, function(response) {
      response.toString();
    });

  global.app.onSocketEvent('weather_event', function (data) {
    updateData(data);
  })

  function updateData(data){
    currentWeather.innerText = "Feels like: "+data.heatindex+" f";
    tempTemp.innerText = data.tempf;
    tempRain.innerText = data.rainin;
    tempWind.innerText = getWindDirection(data)+" "+data.windspeedmph;
    tempHumid.innerText = data.humidity;
  }

  function weatherioSuccess(data) {
    currentOutlook.innerText = data.summary;
    var icon;
    var color;
    switch(data.icon){
      case 'clear-night':
        icon = "/images/weather/Moon.svg";
        color = 'amber';
        break;
      case 'rain':
        icon = "/images/weather/Cloud-Rain.svg";
        color = 'blue';
        break;
      case 'snow':
        icon = "/images/weather/Snowflake.svg";
        color = 'grey';
        break;
      case'sleet':
        icon = "/images/weather/Cloud-Snow.svg";
        color = 'grey';
        break;
      case 'wind':
        icon = "/images/weather/Cloud-Wind.svg";
        color = 'grey';
        break;
      case 'fog':
        icon = "/images/weather/Cloud-Fog.svg";
        color = 'grey';
        break;
      case 'cloudy':
        icon = "/images/weather/Cloud.svg";
        color = 'grey';
        break;
      case 'partly-cloudy-day':
        icon = "/images/weather/Cloud-Sun.svg";
        color = 'amber';
        break;
      case 'partly-cloudy-night':
        icon = "/images/weather/Cloud-Moon.svg";
        color = 'amber';
        break;
      case 'hail':
        icon = "/images/weather/Cloud-Hail.svg";
        color = 'blue';
        break;
      case 'thunderstorm':
        icon = "/images/weather/Degrees-Fahrenheit.svg";
        color = 'blue';
        break;
      case 'tornado':
        icon = "/images/weather/Tornado.svg";
        color = 'grey';
        break;
      default:
        //clear day
        icon = "/images/weather/Sun.svg";
        color = 'amber';
    }
    currentIcon.src = icon;
    setColors(color);
  };

  function getWindDirection(weatherObj){
    switch (weatherObj.winddir) {
      case 0:
        return "N";
        break;
      case 1:
        return "NE";
        break;
      case 2:
        return "E";
        break;
      case 3:
        return "SE";
        break;
      case 4:
        return "S";
        break;
      case 5:
        return "SW";
        break;
      case 6:
        return "W";
        break;
      case 7:
        return "NW";
        break;
      default:
        return "NA";
    }
  };

  function setColors(color){
    $('.color_me1').removeClass('mdl-color--grey-200 mdl-color--blue-200 mdl-color--amber-200').addClass('mdl-color--'+color+'-200');
    $('.color_me2').removeClass('mdl-color--grey-300 mdl-color--blue-300 mdl-color--amber-300').addClass('mdl-color--'+color+'-300');
    $('.color_me3').removeClass('mdl-color--grey-400 mdl-color--blue-400 mdl-color--amber-400').addClass('mdl-color--'+color+'-400');
    $('.color_me4').removeClass('mdl-color--grey-500 mdl-color--blue-500 mdl-color--amber-500').addClass('mdl-color--'+color+'-500');
    $('.color_me5').removeClass('mdl-color--grey-600 mdl-color--blue-600 mdl-color--amber-600').addClass('mdl-color--'+color+'-600');
  }

})(window)
