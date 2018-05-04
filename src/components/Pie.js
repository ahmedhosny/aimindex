import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Plot from 'react-plotly.js';
import {countBy, sortBy, reverse} from 'lodash';
import theme from '../theme.js';

const GPlot = glamorous(Plot)({
  width: '100%',
  height: 600,
});

/**
 * Pie chart
 * @extends React
 */
class Pie extends React.Component {
  /**
   * Renders the pie chart
   * @return {ReactElement}
   */
  render() {
    const {data, useCountBy} = this.props;
    const input = useCountBy ? countBy(data) : data;
    // input looks like {paywall: 29, open-access: 6}
    // Need to convert to list, then sort and reverse.
    // artificial cut at 20 items.
    let inputArray = [];
    Object.keys(input).map((key, idx) => {
      inputArray.push({key: key, value: input[key]});
    });
    inputArray = reverse(sortBy(inputArray, 'value'));
    inputArray = inputArray.length > 20 ? inputArray.slice(0, 19) : inputArray;
    return (
      <GPlot
        useResizeHandler={true}
        data={[
          {
            values: inputArray.map((entry) => {
              return entry.value;
            }),
            labels: inputArray.map((entry) => {
              return entry.key;
            }),
            type: 'pie',
            hoverinfo: 'label+value+percent',
            text: inputArray.map((entry) => {
              return entry.value;
            }),
            textposition: 'outside',
            direction: 'clockwise',
            rotation: 0,
            pull: 0.02,
            hole: 0.3,
            sort: false,
            marker: {
              colors:
                inputArray.length > 10
                  ? theme.tealPie['19']
                  : theme.tealPie['10'],
              line: {
                color: theme.orange,
                width: 0.01,
              },
            },
          },
        ]}
        layout={{autosize: true, title: ''}}
        config={theme.plotlyConfig}
      />
    );
  }
}
Pie.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired,
  ]),
  useCountBy: PropTypes.bool.isRequired,
};
Pie.defaultProps = {
  useCountBy: true,
};
export default Pie;
