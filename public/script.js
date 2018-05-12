window.onload = function() {
  let socket = io();

  socket.on('live', tick => {
    $('#live').text(tick.rate);
  });

  socket.on('zeb', tick => {
    console.log(tick);
    $('#zeb').text(tick.rate);
  });

  socket.on('play', dummy => {
    let playtr = new Audio('pray.mp3');
    playtr.play();
  });

  let dataPoints = [];
  let chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: 'Try Zooming and Panning'
    },
    axisY: {
      includeZero: false
    },
    data: [
      {
        type: 'line',
        name: 'crypto premium',
        connectNullData: true,
        // nullDataLineDashType: "solid",
        xValueType: 'dateTime',
        xValueFormatString: 'DD MMM hh:mm TT',
        dataPoints: dataPoints
      }
    ]
  });

  chart.render();
  //console.log(chart.options.data[0].dataPoints);

  socket.on('data', data => {
    data
      .map(itm => {
        chart.options.data[0].dataPoints.push({
          x: itm.time,
          y: itm.rate
        });
      })
      .sort((a, b) => {
        if (a.x === b.x) {
          return 0;
        } else {
          return a.x < b.x ? -1 : 1;
        }
      });

    chart.render();
    // console.log(chart.options.data[0].dataPoints);
  });

  let dataPoints1 = [];
  let chart1 = new CanvasJS.Chart('chartContainer1', {
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: 'Try Zooming and Panning'
    },
    axisY: {
      includeZero: false
    },
    data: [
      {
        type: 'line',
        name: 'crypto premium1',
        connectNullData: true,
        // nullDataLineDashType: "solid",
        xValueType: 'dateTime',
        xValueFormatString: 'DD MMM hh:mm TT',
        dataPoints: dataPoints1
      }
    ]
  });

  chart1.render();

  socket.on('data1', data => {
    data
      .map(itm => {
        chart1.options.data[0].dataPoints.push({
          x: itm.time,
          y: itm.rate
        });
      })
      .sort((a, b) => {
        if (a.x === b.x) {
          return 0;
        } else {
          return a.x < b.x ? -1 : 1;
        }
      });

    chart1.render();
  });
};
