import {
  processText,
  push,
  prepareDataForHeatmaps,
  prepareDataSharing,
} from './funcs';

/**
 * Creates a new properly formated object for plotting from the jsonList
 * @param  {array} jsonList Data from jsonList
 * @return {object}      An object containing all metrics to plot
 */
export function formatData(jsonList) {
  console.log('formatting data');
  let data = {
    // stats - singles
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
    // stats - doubles
    domains_tasks: [],
    domains_architectures: [],
    methods_dataTypes: [],
    // reproducibility - singles
    dataSharing: [],
  };
  jsonList.map((row, index) => {
    // stats - singles
    data.years.push(parseInt(row.year));
    push(data.tasks, [row.task_1, row.task_2]);
    data.domains.push(row.domain);
    data.abstracts += ' ' + row.abstract;
    data.sources.push(row.source);
    push(data.architectures, [row.method_1, row.method_2, row.method_3]);
    push(data.anatomy, [row.location]);
    push(data.types, [row.data_type]);
    push(data.countries, [row.country_1, row.country_2, row.country_3]);
    push(data.journals, [row.journal]);
    push(data.conferences, [row.conference]);
    data.publicPrivate.push(row.public == 0 ? 'paywall' : 'open-access');
    push(data.impactFactors, [row.impact_factor]);
    // stats - doubles
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
    // reproducibility - singles
    prepareDataSharing(data.dataSharing, [
      row.data_public,
      row.data_upon_request,
      row.data_shared,
    ]);
  });
  // post processing
  data.abstracts = processText(data.abstracts);
  data.jourConf = {
    journals: data.journals.length,
    conferences: data.conferences.length,
  };
  // sanity check
  {
    data.jourConf.journals + data.jourConf.conferences != data.count
      ? console.log('Error in journal/conference calculation.')
      : null;
  }
  console.log(data.dataSharing);
  return data;
}
