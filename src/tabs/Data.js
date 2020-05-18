import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Slide from '../components/Slide';
import Cells from '../components/Cells';

/**
 * The component
 * @type {Object}
 */
class Data extends Component {
  /**
   * Render
   * @return {ReactElement}
   */
  render() {
    const {data, raw} = this.props;
    const tableData = {
      columns: [
        'title',
        'year',
        'source',
        'domain',
        'task_1',
        'task_2',
        'data_type',
        'location',
        'method_1',
        'method_2',
        'method_3',
      ],
      columnWidths: [700, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200],
      entries: raw,
    };
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12} md={12}>
            <div>
              <Cells data={tableData} />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
Data.propTypes = {
  data: PropTypes.object.isRequired,
  raw: PropTypes.array.isRequired,
};
export default Data;

// <Slide
//   title={data.count.toString()}
//   text={
//     'Every effort has been made to correctly categorize these\
//   research papers. If you have reason to believe that the\
//   infomation represented here is incorrect, please let us know.'
//   }
// />
