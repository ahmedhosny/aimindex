/**
 * Function to remove zeros from arrays
 * @param  {array} arr array
 * @return {array}     Array with no zeros
 */
function removeZeros(arr) {
  return _.remove(arr, function(n) {
    return n != 0;
  });
}

/**
 * Fills the innerHTML of a div
 * @param  {string} value   Value to put in string
 * @param  {string} divName id of string
 */
function fillDiv(value, divId) {
  document.getElementById(divId).innerHTML = value;
}

/**
 * Draws a histogram.
 * @param  {object} data Specific Object from csv
 * @param  {string} name         Name of metric to plot
 */
function drawHisto(input, name, xAxis, yAxis) {
  const trace = {
    x: input,
    type: "histogram"
  };
  const data = [trace];
  const layout = {
    title: name,
    xaxis: { title: xAxis, nticks: 5 },
    yaxis: { title: yAxis }
  };
  Plotly.newPlot(name, data, layout, modeBar);
}

/**
 * Draws a pie chart.
 * @param  {object} data Specific Object from csv
 * @param  {string} name         Name of metric to plot
 */
function drawPie(input, name, useCountBy = true) {
  if (useCountBy) {
    input = _.countBy(input);
  }
  const data = [
    {
      values: Object.values(input),
      labels: Object.keys(input),
      type: "pie",
      text: Object.values(input),
      marker: {
        // colors : ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]
      },
      direction: "clockwise",
      rotation: 0,
      hole: 0.3
    }
  ];
  const layout = {
    title: name
  };
  Plotly.newPlot(name, data, layout, modeBar);
}

/**
 * Cleans up the abstract and splits into words for the word Cloud
 * @param  {string} str Single string of abstracts added up.
 * @return {Array}     array of single clean words.
 */
function processText(str) {
  str = str.toLowerCase();
  str = str.replace(/[^A-Za-z0-9_]/g, " ");
  str = str.replace(/[0-9]/g, "");
  str = str.removeStopWords();
  str = str.split(" ");
  str = _.countBy(str);
  arr = [];
  for (obj in str) {
    arr.push({
      word: obj,
      count: str[obj]
    });
  }
  arr = _.reverse(_.sortBy(arr, "count"));
  return arr;
}

/**
 * Plots 2d heatmap.
 * @param  {array} data    Array of all possible pairs
 * @param  {string} name    name of div
 * @param  {array} xLabels Array of all x labels (contains duplicates)
 * @param  {array} yLabels Array of all y labels (contains duplicates)
 * @param  {string} xAxis   name of x xaxis
 * @param  {string} yAxis   name of y axis
 */
function drawHeatmap(data, name, xLabels, yLabels, xAxis, yAxis) {
  // get labels
  const xValues = Object.keys(_.countBy(xLabels)); //13
  const yValues = Object.keys(_.countBy(yLabels)); //11
  var data = _.countBy(data);
  // make zVal
  var zValues = [];
  // loop through Y
  for (var i = 0; i < 11; i++) {
    zValues[i] = [];
    // loop through X
    for (var j = 0; j < 13; j++) {
      // get name
      const key = xValues[j] + "_" + yValues[i];
      zValues[i][j] = data[key] != undefined ? data[key] : 0;
    }
  }

  var colorscaleValue = [[0, "rgb(0,150,136)"], [1, "#001f3f"]];

  var data = [
    {
      x: xValues,
      y: yValues,
      z: zValues,
      type: "heatmap",
      colorscale: colorscaleValue,
      showscale: false
    }
  ];

  var layout = {
    title: name,
    annotations: [],
    xaxis: {
      ticks: "",
      side: "bottom",
      title: xAxis
    },
    yaxis: {
      ticks: "",
      ticksuffix: " ",
      width: 700,
      height: 700,
      autosize: false,
      title: yAxis
    }
  };

  for (var i = 0; i < yValues.length; i++) {
    for (var j = 0; j < xValues.length; j++) {
      var currentValue = zValues[i][j];
      if (currentValue != 0.0) {
        var textColor = "white";
      } else {
        var textColor = "black";
      }
      var result = {
        xref: "x1",
        yref: "y1",
        x: xValues[j],
        y: yValues[i],
        text: zValues[i][j],
        font: {
          family: "Arial",
          size: 12,
          color: textColor
        },
        showarrow: false
      };
      layout.annotations.push(result);
    }
  }

  Plotly.newPlot(name, data, layout);
}
