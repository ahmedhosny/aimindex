import {
  processText,
  push,
  prepareDataForHeatmaps,
  prepareDataSharing,
  prepareDataForHisto2d,
} from './funcs';
import _ from 'lodash';

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
    codeSharing: [],
    codeBasis: [],
    codeBasisLinks: [],
    transferLearning: [],
    crossValidation: [],
    // reproducibility - doubles
    // // first time use of histo 2d (simpler than heat)
    countries_codeSharing: {
      x: [],
      y: [],
    },
    countries_dataSharing: {
      x: [],
      y: [],
    },
    impactFactors_codeSharing: {
      x: [],
      y: [],
    },
    impactFactors_dataSharing: {
      x: [],
      y: [],
    },
    domains_transferLearning: {
      x: [],
      y: [],
    },
    domains_crossValidation: {
      x: [],
      y: [],
    },
  };
  jsonList.map((row, index) => {
    //
    // stats - singles
    //
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
    //
    // stats - doubles
    //
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
    //
    // reproducibility - singles
    //
    let dataSharingMiniList = prepareDataSharing([
      row.data_public,
      row.data_upon_request,
      row.data_shared,
    ]);
    data.dataSharing = [...data.dataSharing, ...dataSharingMiniList];
    data.codeSharing.push(
      row.code_public == 1 ? 'code made public' : 'code unavailable'
    );
    data.codeBasis.push(
      row.based_on_1_name == 0 ? 'no code basis' : row.based_on_1_name
    );
    row.based_on_1 != 0
      ? data.codeBasisLinks.push({
          link: row.based_on_1,
          name: row.based_on_1_name,
        })
      : null;
    let transferLearning =
      row.transfer_learning == 0 ? 'end-to-end training' : 'transfer learning';
    data.transferLearning.push(transferLearning);
    let crossValidation =
      row.cross_validation == 0
        ? 'multiple datasets used'
        : 'cross validation used';
    data.crossValidation.push(crossValidation);
    //
    // reproducibility - doubles
    //
    prepareDataForHisto2d(
      data.countries_codeSharing,
      [row.country_1, row.country_2, row.country_3],
      [row.code_public == 1 ? 'code made public' : 'code unavailable']
    );
    prepareDataForHisto2d(
      data.countries_dataSharing,
      [row.country_1, row.country_2, row.country_3],
      dataSharingMiniList
    );
    prepareDataForHisto2d(
      data.impactFactors_codeSharing,
      [row.impact_factor],
      [row.code_public == 1 ? 'code made public' : 'code unavailable']
    );
    prepareDataForHisto2d(
      data.impactFactors_dataSharing,
      [row.impact_factor],
      dataSharingMiniList
    );
    prepareDataForHisto2d(
      data.domains_transferLearning,
      [row.domain],
      [transferLearning]
    );
    prepareDataForHisto2d(
      data.domains_crossValidation,
      [row.domain],
      [crossValidation]
    );
  });
  //
  // post processing
  //
  data.abstracts = processText(data.abstracts);
  data.jourConf = {
    journals: data.journals.length,
    conferences: data.conferences.length,
  };
  data.codeBasisLinks = _.uniqBy(data.codeBasisLinks, 'name');
  // sanity check
  {
    data.jourConf.journals + data.jourConf.conferences != data.count
      ? console.log('Error in journal/conference calculation.')
      : null;
  }
  return data;
}
