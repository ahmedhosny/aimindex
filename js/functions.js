/**
 * Function to remove zeros from arrays
 * @param  {array} arr array
 * @return {array}     Array with no zeros
 */
function removeZeros(arr){
   return _.remove(arr, function(n){
    return n != 0;
  })
}

/**
 * Fills the innerHTML of a div
 * @param  {string} value   Value to put in string
 * @param  {string} divName id of string
 */
function fillDiv(value, divId){
  document.getElementById(divId).innerHTML = value;
}

/**
 * Draws a histogram.
 * @param  {object} formatedData Specific Object from csv
 * @param  {string} name         Name of metric to plot
 */
function drawHisto(formatedData, name, xAxis, yAxis){
  const trace = {
    x: formatedData,
    type: 'histogram',
  };
  const data = [trace];
  const layout = {
    title: name,
    xaxis: {title: xAxis, nticks: 5},
    yaxis: {title: yAxis}
  };
  Plotly.newPlot(name, data, layout, modeBar);
}

/**
 * Draws a pie chart.
 * @param  {object} formatedData Specific Object from csv
 * @param  {string} name         Name of metric to plot
 */
function drawPie(formatedData, name){
  const count = _.countBy(formatedData)
  const data = [{
    values: Object.values(count),
    labels: Object.keys(count),
    type: 'pie',
    text: Object.values(count),
    marker: {
      // colors : ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]
    },
    direction: "clockwise",
    rotation: 0,
    hole: 0.3
  }];
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
function processText(str){
  str = str.toLowerCase();
  str = str.replace(/[^A-Za-z0-9_]/g," ")
  str = str.replace(/[0-9]/g, "")
  str = str.removeStopWords();
  str = str.split(" ")
  str = _.countBy(str)
  arr = [];
  for (obj in str){
    arr.push({
      'word':obj,
      'count':str[obj]
    })
  }
  arr = _.reverse(_.sortBy(arr,'count'));
  return arr;
}
