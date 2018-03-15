const modeBar = { displaylogo: false ,
  displayModeBar: true ,
  modeBarButtonsToRemove: ['sendDataToCloud']
}

url = "https://raw.githubusercontent.com/ahmedhosny/rescience/master/jupyter/" +
"combined_180312.csv?token=AIAl_o9uRC4zDr0WoAGNiKT_7oI8w66Eks5asWvFwA%3D%3D";
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
    abstracts: "",
    years: [],
    tasks: [],
    domains: [],
    sources: [],
    architectures: [],
    anatomy: [],
    types: [],
    countries: []
  }
  data.map((row,index) => {
    formatedData.years.push(parseInt(row.year));
    formatedData.tasks.push.apply(formatedData.tasks, [row.task_1, row.task_2]);
    formatedData.domains.push(row.domain);
    formatedData.abstracts += " " + row.abstract;
    formatedData.sources.push(row.source);
    formatedData.architectures.push.apply(formatedData.architectures, [row.method_1, row.method_2, row.method_3]);
    formatedData.anatomy.push(row.location);
    formatedData.types.push(row.data_type);
    formatedData.countries.push.apply(formatedData.countries, [row.country_1, row.country_2, row.country_3]);
  });
  // post processing
  formatedData.tasks = removeZeros(formatedData.tasks);
  formatedData.architectures = removeZeros(formatedData.architectures);
  formatedData.anatomy = removeZeros(formatedData.anatomy);
  formatedData.types = removeZeros(formatedData.types);
  formatedData.abstracts = processText(formatedData.abstracts);
  formatedData.countries = removeZeros(formatedData.countries);
  return formatedData
}

/**
 * Draws all charts
 * @param  {Object} formatedData Object from csv
 */
function drawData(formatedData){
  fillDiv(formatedData.count, 'Count');
  drawCloud(formatedData.abstracts);
  drawHisto(formatedData.years, 'Years', 'Years', 'Frequency');
  drawPie(formatedData.tasks, 'Tasks');
  drawPie(formatedData.domains, 'Domains');
  drawPie(formatedData.sources, 'Sources');
  drawPie(formatedData.architectures, 'Architectures');
  drawPie(formatedData.anatomy, 'Anatomy');
  drawPie(formatedData.types, 'Types');
  drawChoropleth(formatedData.countries, 'Choropleth')
  console.log(formatedData)
}
