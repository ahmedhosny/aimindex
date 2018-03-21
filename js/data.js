const modeBar = {
  displaylogo: false,
  displayModeBar: true,
  modeBarButtonsToRemove: ["sendDataToCloud"]
};

url =
  "https://raw.githubusercontent.com/ahmedhosny/rescience/master/jupyter/" +
  "combined_180312.csv?token=AIAl_kYBOzYBGDi1HkT1IryGdzLxK_dbks5au_YawA%3D%3D";
loadAndDraw(url);

function loadAndDraw(url) {
  Plotly.d3.csv(url, function(csv) {
    // format data
    data = formatData(csv);
    // draw data
    drawData(data);
  });
}

/**
 * Creates a new properly formated object for plotting from the csv
 * @param  {object} data Data from csv
 * @return {object}      An object containing all metrics to plot
 */
function formatData(csv) {
  let data = {
    // singles
    count: csv.length,
    abstracts: "",
    years: [],
    tasks: [],
    domains: [],
    sources: [],
    architectures: [],
    anatomy: [],
    types: [],
    countries: [],
    journals: [],
    conferences: [],
    jourConf: {},
    publicPrivate: [],
    impactFactors: [],
    // doubles
    domains_tasks: []
  };
  csv.map((row, index) => {
    // singles
    data.years.push(parseInt(row.year));
    data.tasks.push.apply(data.tasks, [row.task_1, row.task_2]);
    data.domains.push(row.domain);
    data.abstracts += " " + row.abstract;
    data.sources.push(row.source);
    data.architectures.push.apply(data.architectures, [
      row.method_1,
      row.method_2,
      row.method_3
    ]);
    data.anatomy.push(row.location);
    data.types.push(row.data_type);
    data.countries.push.apply(data.countries, [
      row.country_1,
      row.country_2,
      row.country_3
    ]);
    data.journals.push(row.journal);
    data.conferences.push(row.conference);
    data.publicPrivate.push(row.public == 0 ? "paywall" : "open-access");
    data.impactFactors.push(row.impact_factor);
    // doubles
    {
      row.task_1 != 0
        ? data.domains_tasks.push(row.domain + "_" + row.task_1)
        : null;
    }
    {
      row.task_2 != 0
        ? data.domains_tasks.push(row.domain + "_" + row.task_2)
        : null;
    }
  });
  // post processing
  data.tasks = removeZeros(data.tasks);
  data.architectures = removeZeros(data.architectures);
  data.anatomy = removeZeros(data.anatomy);
  data.types = removeZeros(data.types);
  data.abstracts = processText(data.abstracts);
  data.countries = removeZeros(data.countries);
  data.journals = removeZeros(data.journals);
  data.conferences = removeZeros(data.conferences);
  data.jourConf = {
    journals: data.journals.length,
    conferences: data.conferences.length
  };
  {
    data.jourConf.journals + data.jourConf.conferences != data.count
      ? console.log("Error in journal/conference calculation.")
      : null;
  }
  data.impactFactors = removeZeros(data.impactFactors);
  return data;
}

/**
 * Draws all charts
 * @param  {Object} data Object from csv
 */
function drawData(data) {
  fillDiv(data.count, "Count");
  drawCloud(data.abstracts);
  drawHisto(data.years, "Years", "Years", "Frequency");
  drawPie(data.tasks, "Tasks");
  drawPie(data.domains, "Domains");
  drawPie(data.sources, "Sources");
  drawPie(data.architectures, "Architectures");
  drawPie(data.anatomy, "Anatomy");
  drawPie(data.types, "Types");
  drawChoropleth(data.countries, "Choropleth");
  drawPie(data.jourConf, "jourConf", false);
  drawPie(data.publicPrivate, "Accessibility");
  drawHisto(data.impactFactors, "ImpactFactors", "Impact Factors", "Frequency");
  drawHeatmap(
    data.domains_tasks,
    "domains_tasks",
    data.domains,
    data.tasks,
    "Domains",
    "tasks"
  );
  console.log(data);
}
