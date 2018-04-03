import _ from 'lodash';

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
 * Creates pairs from non-zero items to draw the heatmaps
 * @param  {array} listToPushTo array to push to
 * @param  {array} listA        Array of x axis - can have multiple entries
 * @param  {array} listB        Array of y axis - can have multiple entries
 */
function prepareDataForHeatmaps(listToPushTo, listA, listB) {
  listA.map((a, idx) => {
    listB.map((b, idx) => {
      if ((a != 0) & (b != 0)) {
        listToPushTo.push(a + '_' + b);
      }
    });
  });
}

/**
 * Cleans up the abstract and splits into words for the word Cloud
 * @param  {string} str Single string of abstracts added up.
 * @return {Array}     array of single clean words.
 */
function processText(str) {
  str = str.toLowerCase();
  str = str.replace(/[^A-Za-z0-9_]/g, ' ');
  str = str.replace(/[0-9]/g, '');
  // str = str.removeStopWords();
  str = str.split(' ');
  str = _.countBy(str);
  let arr = [];
  // str.map(obj => {
  //   arr.push({
  //     word: obj,
  //     count: str[obj]
  //   });
  // });
  // arr = _.reverse(_.sortBy(arr, "count"));
  return arr;
}

/**
 * Creates a new properly formated object for plotting from the jsonList
 * @param  {array} jsonList Data from jsonList
 * @return {object}      An object containing all metrics to plot
 */
export function formatData(jsonList) {
  console.log('formatting data');
  let data = {
    // singles
    count: jsonList.length,
    abstracts: '',
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
    domains_tasks: [],
    domains_architectures: [],
    methods_dataTypes: [],
  };
  jsonList.map((row, index) => {
    // singles
    data.years.push(parseInt(row.year));
    data.tasks.push.apply(data.tasks, [row.task_1, row.task_2]);
    data.domains.push(row.domain);
    data.abstracts += ' ' + row.abstract;
    data.sources.push(row.source);
    data.architectures.push.apply(data.architectures, [
      row.method_1,
      row.method_2,
      row.method_3,
    ]);
    data.anatomy.push(row.location);
    data.types.push(row.data_type);
    data.countries.push.apply(data.countries, [
      row.country_1,
      row.country_2,
      row.country_3,
    ]);
    data.journals.push(row.journal);
    data.conferences.push(row.conference);
    data.publicPrivate.push(row.public == 0 ? 'paywall' : 'open-access');
    data.impactFactors.push(row.impact_factor);
    // heatmaps
    prepareDataForHeatmaps(
      data.domains_tasks,
      [row.domain],
      [row.task_1, row.task_2]
    );
    prepareDataForHeatmaps(
      data.domains_architectures,
      [row.domain],
      [row.method_1, row.method_2, row.method_3]
    );
    prepareDataForHeatmaps(
      data.methods_dataTypes,
      [row.method_1, row.method_2, row.method_3],
      [row.data_type]
    );
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
    conferences: data.conferences.length,
  };
  {
    data.jourConf.journals + data.jourConf.conferences != data.count
      ? console.log('Error in journal/conference calculation.')
      : null;
  }
  data.impactFactors = removeZeros(data.impactFactors);
  return data;
}
