import {
  processText,
  push,
  // prepareDataForHeatmaps,
  prepareDataSharing,
  prepareJourConf,
  prepareDataForHisto2d,
  prepareDataForStackedBar,
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
    tools: [],
    // stats - doubles
    domains_tasks: {
      x: [],
      y: [],
    },
    domains_architectures: {
      x: [],
      y: [],
    },
    methods_dataTypes: {
      x: [],
      y: [],
    },
    //
    // Reproducibility
    //
    // reproducibility - data
    dataSharing: [],
    countries_dataSharing: [],
    impactFactors_dataSharing: [],
    jourConf_dataSharing: [],
    publicPrivate_dataSharing: [],
    // reproducibility - code
    codeSharing: [],
    countries_codeSharing: [],
    impactFactors_codeSharing: [],
    jourConf_codeSharing: [],
    publicPrivate_codeSharing: [],
    // reproducibility - methods
    transferLearning: [],
    domains_transferLearning: [],
    crossValidation: [],
    domains_crossValidation: [],
    codeBasis: [],
    codeBasisLinks: [],
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
    let publicPrivate = row.public == 0 ? 'paywall' : 'open-access';
    data.publicPrivate.push(publicPrivate);
    push(data.impactFactors, [row.impact_factor]);
    push(data.tools, row.tools); // tools is already a list
    //
    // stats - doubles
    //
    prepareDataForHisto2d(
      data.domains_tasks,
      [row.domain],
      [row.task_1, row.task_2]
    );
    prepareDataForHisto2d(
      data.domains_architectures,
      [row.domain],
      [row.method_1, row.method_2, row.method_3]
    );
    prepareDataForHisto2d(
      data.methods_dataTypes,
      [row.method_1, row.method_2, row.method_3],
      [row.data_type]
    );
    //
    // reproducibility - data
    //
    let dataSharingMiniList = prepareDataSharing([
      row.data_public,
      row.data_upon_request,
      row.data_shared,
    ]);
    let jourConf = prepareJourConf(row.journal, row.conference);
    data.dataSharing = [...data.dataSharing, ...dataSharingMiniList];
    prepareDataForStackedBar(
      data.countries_dataSharing,
      [row.country_1, row.country_2, row.country_3],
      dataSharingMiniList
    );
    prepareDataForStackedBar(
      data.impactFactors_dataSharing,
      [row.impact_factor],
      dataSharingMiniList
    );
    prepareDataForStackedBar(
      data.jourConf_dataSharing,
      [jourConf],
      dataSharingMiniList
    );
    prepareDataForStackedBar(
      data.publicPrivate_dataSharing,
      [publicPrivate],
      dataSharingMiniList
    );
    //
    // reproducibility - code
    //
    let codePublic = row.code_public == 1 ? 'code made public' : 'code private';
    data.codeSharing.push(codePublic);
    prepareDataForStackedBar(
      data.countries_codeSharing,
      [row.country_1, row.country_2, row.country_3],
      [codePublic]
    );
    prepareDataForStackedBar(
      data.impactFactors_codeSharing,
      [row.impact_factor],
      [codePublic]
    );
    prepareDataForStackedBar(
      data.jourConf_codeSharing,
      [jourConf],
      [codePublic]
    );
    prepareDataForStackedBar(
      data.publicPrivate_codeSharing,
      [publicPrivate],
      [codePublic]
    );
    //
    // reproducibility - methods
    //
    // transfer learning
    let transferLearning =
      row.transfer_learning == 0 ? 'end-to-end training' : 'transfer learning';
    data.transferLearning.push(transferLearning);
    prepareDataForStackedBar(
      data.domains_transferLearning,
      [row.domain],
      [transferLearning]
    );
    // cross validation
    let crossValidation =
      row.cross_validation == 0
        ? 'multiple datasets used'
        : 'cross validation used';
    data.crossValidation.push(crossValidation);
    prepareDataForStackedBar(
      data.domains_crossValidation,
      [row.domain],
      [crossValidation]
    );
    // code basis
    data.codeBasis.push(
      row.based_on_1_name == 0 ? 'no code basis' : row.based_on_1_name
    );
    row.based_on_1 != 0
      ? data.codeBasisLinks.push({
          link: row.based_on_1,
          name: row.based_on_1_name,
        })
      : null;
  });
  //
  // post processing
  //
  data.abstracts = processText(data.abstracts);
  data.jourConf = {
    journals: data.journals.length,
    conferences: data.conferences.length,
    preprint: data.count - (data.journals.length + data.conferences.length),
  };
  data.codeBasisLinks = _.uniqBy(data.codeBasisLinks, 'name');
  // sanity check
  // {
  //   data.jourConf.journals + data.jourConf.conferences != data.count
  //     ? console.log('Error in journal/conference calculation.')
  //     : null;
  // }
  console.log(data.tools);
  return data;
}
