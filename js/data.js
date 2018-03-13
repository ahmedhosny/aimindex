// var data = [{
//   values: [19, 26, 55],
//   labels: ['Residential', 'Non-Residential', 'Utility'],
//   type: 'pie'
// }];
//
// var layout0 = {
//   width: document.getElementById('header').offsetWidth
// };
// //
// var layout1 = {
//   width: document.getElementById('tester1').offsetWidth
// };
//
// Plotly.newPlot('tester0', data, layout0 , { displaylogo: false ,
//   displayModeBar: true ,
//   modeBarButtonsToRemove: ['sendDataToCloud']
// });
// Plotly.newPlot('tester1', data, layout1,);


const modeBar = { displaylogo: false ,
  displayModeBar: true ,
  modeBarButtonsToRemove: ['sendDataToCloud']
}

url = "https://raw.githubusercontent.com/ahmedhosny/rescience/master/js/" +
"combined_180311.csv?token=AIAl_pjELY-SSY0hqCtsSDealWv-x_wvks5arzONwA%3D%3D"
loadAndDraw(url)

function loadAndDraw(url){
  Plotly.d3.csv(url, function(data){
    // format data
    formatedData = formatData(data);
    // draw data
    drawData(formatedData)
  });
}

/**
 * Creates a new properly formated object for plotting from the csv
 * @param  {object} data Data from csv
 * @return {object}      An object containing all metrics to plot
 */
function formatData(data){
  let formatedData = {
    count: data.length,
    years: [],
    tasks: [],
    domains: []
  }
  data.map((row,index) => {
    formatedData.years.push(parseInt(row.year))
    formatedData.tasks.push(row.task_1)
    formatedData.tasks.push(row.task_2)
    formatedData.domains.push(row.domain)
  });
  // post processing
  formatedData.tasks = _.remove(formatedData.tasks, function(n){
    return n != 0;
  })
  return formatedData
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
    colorscale: 'Jet'
  }];
  const layout = {
    title: name
  };
  Plotly.newPlot(name, data, layout, modeBar);
}
/**
 * Draws all charts
 * @param  {Object} formatedData Object from csv
 */
function drawData(formatedData){
  fillDiv(formatedData.count, 'Count')
  drawHisto(formatedData.years, 'Years', 'Years', 'Frequency')
  drawPie(formatedData.tasks, 'Tasks')
  drawPie(formatedData.domains, 'Domains')
}
