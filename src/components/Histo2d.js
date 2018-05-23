import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Plot from 'react-plotly.js';
import theme from '../theme.js';
import {max, ceil, countBy} from 'lodash';

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
    const {xData, yData, xAxis, yAxis, autobinx, height} = this.props;
    const GPlot = glamorous(Plot)({
      width: '100%',
      height: height,
    });
    return (
      <GPlot
        useResizeHandler={true}
        data={[
          {
            x: xData,
            y: yData,
            type: 'histogram2d',
            histnorm: '',
            colorscale: theme.tealScale,
            showscale: true,
            colorbar: {
              thickness: 10,
            },
            // for continuous values (such as impact factor)
            autobinx: autobinx,
            xbins: autobinx
              ? {}
              : {
                  start: 0,
                  end: ceil(max(xData)),
                  size: 1,
                },
          },
        ]}
        layout={{
          margin: {
            l: 140,
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
            tickmode: 'auto',
            nticks: 100, // forces all ticks to appear
            ticks: '',
            ticksuffix: ' ',
            title: yAxis,
          },
        }}
        config={theme.plotlyConfig}
      />
    );
  }
}
Histo2d.propTypes = {
  xData: PropTypes.array.isRequired,
  yData: PropTypes.array.isRequired,
  xAxis: PropTypes.string.isRequired,
  yAxis: PropTypes.string.isRequired,
  autobinx: PropTypes.bool.isRequired,
  height: PropTypes.oneOfType([
    PropTypes.number.isRequired,
    PropTypes.string.isRequired,
  ]),
};
Histo2d.defaultProps = {
  autobinx: true,
  height: '',
};
export default Histo2d;
