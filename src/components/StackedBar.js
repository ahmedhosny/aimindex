import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Plot from 'react-plotly.js';
import theme from '../theme.js';
import {groupBy, countBy} from 'lodash';

/**
 * StackedBar
 * @extends React
 */
class StackedBar extends React.Component {
  /**
   * Renders a histogram
   * keys must match whatever is passed in data
   * By default, this works for non-numerical x-axis
   * Change float and rotate for numerical x-axis
   * data looks like [{x: "radiology", y: "transfer learning"},
   * {x: "radiology", y: "end-to-end training"}...]
   * @return {ReactElement}
   */
  render() {
    const {data, keys, xAxis, yAxis, float, rotate} = this.props;
    // group by Y
    const mapping = groupBy(data, 'y');
    // make traces list
    let traces = [];
    // loop through keys (stacks in the bar)
    keys.map((key, idx) => {
      // push to it
      const xArr = mapping[key].map((item) => {
        return float ? Math.round(parseFloat(item['x'])) : item['x'];
      });
      // group
      const grouped = countBy(xArr);
      const trace = {
        x: Object.keys(grouped),
        y: Object.keys(grouped).map((key1) => {
          return grouped[key1];
        }),
        name: key,
        type: 'bar',
        marker: {
          color: theme.tealList[keys.length.toString()][idx],
        },
      };
      traces.push(trace);
    });
    const GPlot = glamorous(Plot)({
      width: '100%',
    });
    return (
      <GPlot
        useResizeHandler={true}
        data={traces}
        layout={{
          margin: {
            l: 140,
            r: 50,
            b: 120,
            t: 50,
            pad: 4,
          },
          barmode: 'stack',
          autosize: true,
          title: '',
          xaxis: {title: xAxis, tickangle: rotate ? 45 : 0, dtick: 1},
          yaxis: {
            title: yAxis,
          },
        }}
        config={theme.plotlyConfig}
      />
    );
  }
}
StackedBar.propTypes = {
  data: PropTypes.array.isRequired,
  keys: PropTypes.array.isRequired,
  float: PropTypes.bool.isRequired,
  xAxis: PropTypes.string.isRequired,
  yAxis: PropTypes.string.isRequired,
  rotate: PropTypes.bool.isRequired,
};
StackedBar.defaultProps = {
  float: false,
  rotate: true,
};
export default StackedBar;
