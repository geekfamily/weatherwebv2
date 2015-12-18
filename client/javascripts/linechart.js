(function () {
  google.load('visualization', '1', {'packages':['line','corechart']});
  google.setOnLoadCallback(startListening);

  var chartData = [];
  var chart;

  function drawChart(points) {
    // Create the data table.
    var dataPoints = buildDataSet(points);

    var options = {
      colors: ['#ff9800', '#4caf50', "#2196f3"],
      width: '100%',
      curveType: 'function',
      legend: { position: 'bottom' },
      animation:{
        duration: 1000,
        easing: 'out'
      },
      chartArea: {'width': '80%', 'height': '75%'},
      title: 'Temperature vs Wind Speed vs Humidity'
    };

    //create and draw the chart from DIV
    chart = new google.visualization.AreaChart(document.getElementById('lineChart'));
    chart.draw(dataPoints, options);
  }

  function buildDataSet(dataSet) {
    var data = new google.visualization.DataTable();
    data.addColumn('datetime', 'Time');
    data.addColumn('number', 'Temperature (F)');
    data.addColumn('number', 'Wind Speed (MPH)');
    data.addColumn('number', 'Humidity (%)');

    for (var idx=0;idx<dataSet.length;idx++){
      data.addRows([[new Date(dataSet[idx].created),dataSet[idx].tempf,dataSet[idx].windspeedmph,dataSet[idx].humidity]]);
    }

    var formatter_medium = new google.visualization.DateFormat({formatType: 'medium'});
    formatter_medium.format(data,1);

    return data;
  }

  function startListening() {
    $.get('/records').
      then(function(data) {
        chartData = data;
        drawChart(chartData);
      }, function(response) {
        response.toString();

      });

    window.app.onSocketEvent('weather_event', function (dataSet) {
      var row = [dataSet.created,dataSet.tempf,dataSet.windspeedmph,dataSet.humidity];
      chartData.push(row);
      if (chartData.length >= 288) {
        chartData.shift();
      }
      drawChart(chartData);

    });
  }
})();
