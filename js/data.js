var data = [{
  values: [19, 26, 55],
  labels: ['Residential', 'Non-Residential', 'Utility'],
  type: 'pie'
}];

var layout0 = {
  width: document.getElementById('header').offsetWidth
};
//
var layout1 = {
  width: document.getElementById('tester1').offsetWidth
};

Plotly.newPlot('tester0', data, layout0 , { displaylogo: false ,
  displayModeBar: true ,
  modeBarButtonsToRemove: ['sendDataToCloud']
});
Plotly.newPlot('tester1', data, layout1,{ displaylogo: false ,
  displayModeBar: true ,
  modeBarButtonsToRemove: ['sendDataToCloud']
});
