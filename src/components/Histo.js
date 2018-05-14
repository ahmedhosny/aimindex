import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Plot from 'react-plotly.js';
import theme from '../theme.js';

/**
 * Histogram
 * @extends React
 */
class Histo extends React.Component {
  /**
   * Renders a histogram
   * @return {ReactElement}
   */
  render() {
    const {data, xAxis, yAxis} = this.props;
    const GPlot = glamorous(Plot)({
      width: '100%',
    });
    return (
      <GPlot
        useResizeHandler={true}
        data={[
          {
            x: data,
            type: 'histogram',
            marker: {
              color: theme.darkTeal,
            },
          },
        ]}
        layout={{
          autosize: true,
          title: '',
          xaxis: {title: xAxis, nticks: 5},
          yaxis: {title: yAxis},
        }}
        config={theme.plotlyConfig}
      />
    );
  }
}
Histo.propTypes = {
  data: PropTypes.array.isRequired,
  xAxis: PropTypes.string.isRequired,
  yAxis: PropTypes.string.isRequired,
};
export default Histo;
