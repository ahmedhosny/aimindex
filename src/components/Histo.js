import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Plot from 'react-plotly.js';

const GPlot = glamorous(Plot)({
  width: '100%',
});

class Pie extends React.Component {
  render() {
    const {data, xAxis, yAxis} = this.props;
    return (
      <GPlot
        useResizeHandler={true}
        data={[
          {
            x: data,
            type: 'histogram',
          },
        ]}
        layout={{
          autosize: true,
          title: '',
          xaxis: {title: xAxis, nticks: 5},
          yaxis: {title: yAxis},
        }}
      />
    );
  }
}
Pie.propTypes = {
  data: PropTypes.array.isRequired,
  xAxis: PropTypes.string.isRequired,
  yAxis: PropTypes.string.isRequired,
};
export default Pie;
