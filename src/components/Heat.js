import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Plot from 'react-plotly.js';
import {countBy} from 'lodash';

const GPlot = glamorous(Plot)({
  width: '100%',
});
/**
 * Heat
 * @extends React
 */
class Heat extends React.Component {
  /**
   * Plots numbers on the heatmap
   * @param  {array} xValues ordered list of x ticks
   * @param  {array} yValues ordered list of y ticks
   * @param  {array} zValues array of arrays - 2d matrix
   * @return {array} annotations
   */
  populateAnnotations(xValues, yValues, zValues) {
    let out = [];
    for (let i = 0; i < yValues.length; i++) {
      for (let j = 0; j < xValues.length; j++) {
        let currentValue = zValues[i][j];
        let textColor = '';
        if (currentValue !== 0.0) {
          textColor = 'white';
        } else {
          textColor = 'black';
        }
        let result = {
          xref: 'x1',
          yref: 'y1',
          x: xValues[j],
          y: yValues[i],
          text: zValues[i][j],
          font: {
            family: 'Arial',
            size: 12,
            color: textColor,
          },
          showarrow: false,
        };
        out.push(result);
      }
    }
    return out;
  }

  /**
   * Plots 2d heatmap.
   * @param  {array} data    Array of all possible pairs
   * @param  {array} xLabels Array of all x labels (contains duplicates)
   * @param  {array} yLabels Array of all y labels (contains duplicates)
   * @param  {string} xAxis   name of x xaxis
   * @param  {string} yAxis   name of y axis
   * @return {ReactElement} heatmap
   */
  render() {
    const colorscaleValue = [[0, 'rgb(0,150,136)'], [1, '#001f3f']];
    const {data, xLabels, yLabels, xAxis, yAxis} = this.props;
    // get labels
    const xValues = Object.keys(countBy(xLabels));
    const yValues = Object.keys(countBy(yLabels));
    let input = countBy(data);
    // make zVal
    let zValues = [];
    // loop through Y
    for (let i = 0; i < yValues.length; i++) {
      zValues[i] = [];
      // loop through X
      for (let j = 0; j < xValues.length; j++) {
        // get name
        const key = xValues[j] + '_' + yValues[i];
        zValues[i][j] = input[key] !== undefined ? input[key] : 0;
      }
    }
    return (
      <GPlot
        useResizeHandler={true}
        data={[
          {
            x: xValues,
            y: yValues,
            z: zValues,
            type: 'heatmap',
            colorscale: colorscaleValue,
            showscale: false,
          },
        ]}
        layout={{
          margin: {
            l: 120,
            r: 50,
            b: 120,
            t: 50,
            pad: 4,
          },
          autosize: true,
          title: '',
          annotations: this.populateAnnotations(xValues, yValues, zValues),
          xaxis: {
            ticks: '',
            side: 'bottom',
            title: xAxis,
          },
          yaxis: {
            ticks: '',
            ticksuffix: ' ',
            title: yAxis,
          },
        }}
      />
    );
  }
}
Heat.propTypes = {
  data: PropTypes.array.isRequired,
  xLabels: PropTypes.array.isRequired,
  yLabels: PropTypes.array.isRequired,
  xAxis: PropTypes.string.isRequired,
  yAxis: PropTypes.string.isRequired,
};
export default Heat;
