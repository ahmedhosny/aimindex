import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Plot from 'react-plotly.js';

const GPlot = glamorous(Plot)({
  width: '100%',
});

/**
 * Histogram2d - https://plot.ly/javascript/2D-Histogram/
 * @extends React
 */
class Histo2d extends React.Component {
  /**
   * Render function
   * @return {ReactElement} Histo2d
   */
  render() {
    const {xData, yData, xAxis, yAxis} = this.props;
    return (
      <GPlot
        useResizeHandler={true}
        data={[
          {
            x: xData,
            y: yData,
            type: 'histogram2d',
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
Histo2d.propTypes = {
  xData: PropTypes.array.isRequired,
  yData: PropTypes.array.isRequired,
  xAxis: PropTypes.string.isRequired,
  yAxis: PropTypes.string.isRequired,
};
export default Histo2d;
