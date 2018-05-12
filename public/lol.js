window.onload = function() {
  let dataPoints = [];

  rawdata = [
    { time: 1520224207960, rate: 65.24741081703107 },
    { time: 1520224215450, rate: 65.24741081703107 },
    { time: 1520224220935, rate: 65.24741081703107 },
    { time: 1520224223507, rate: 65.24741081703107 },
    { time: 1520224231650, rate: 65.24741081703107 },
    { time: 1520224233932, rate: 65.30494821634062 },
    { time: 1520224239626, rate: 65.30494821634062 },
    { time: 1520224246944, rate: 65.30494821634062 },
    { time: 1520224247656, rate: 65.30494821634062 },
    { time: 1520224255614, rate: 65.30494821634062 },
    { time: 1520224263666, rate: 65.30494821634062 },
    { time: 1520224273633, rate: 65.30494821634062 },
    { time: 1520224279508, rate: 65.30494821634062 },
    { time: 1520224287675, rate: 65.30494821634062 },
    { time: 1520224295546, rate: 65.30494821634062 },
    { time: 1520224303505, rate: 65.30494821634062 },
    { time: 1520224311506, rate: 65.31998158379375 },
    { time: 1520224319522, rate: 65.31998158379375 },
    { time: 1520224324998, rate: 65.43508287292818 },
    { time: 1520224327719, rate: 65.43508287292818 },
    { time: 1520224335662, rate: 65.43508287292818 },
    { time: 1520224337954, rate: 65.43508287292818 },
    { time: 1520224343608, rate: 65.42002301495972 },
    { time: 1520224350978, rate: 65.42002301495972 },
    { time: 1520224351687, rate: 65.42002301495972 },
    { time: 1520224359689, rate: 65.42002301495972 },
    { time: 1520224364021, rate: 65.42002301495972 },
    { time: 1520224367801, rate: 65.43508287292818 },
    { time: 1520224375545, rate: 65.43508287292818 },
    { time: 1520224383525, rate: 65.43508287292818 },
    { time: 1520224391532, rate: 65.43508287292818 },
    { time: 1520224399724, rate: 65.42002301495972 },
    { time: 1520224407593, rate: 65.42002301495972 },
    { time: 1520224415620, rate: 65.42002301495972 },
    { time: 1520224423728, rate: 65.41927020402527 }
  ];

  dataPoints = rawdata.map(itm => {
    return { x: itm.time, y: itm.rate };
  });

  // Better to construct options first and then pass it as a parameter
  let options = {
    zoomEnabled: true,
    animationEnabled: true,
    title: {
      text: 'Try Zooming - Panning'
    },
    axisY: {
      includeZero: false,
      lineThickness: 1
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
  };

  let chart = new CanvasJS.Chart('chartContainer', options);
  let startTime = new Date();
  chart.render();
  let endTime = new Date();
  document.getElementById('timeToRender').innerHTML =
    'Time to Render: ' + (endTime - startTime) + 'ms';
};
