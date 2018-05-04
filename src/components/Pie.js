import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Plot from 'react-plotly.js';
import {countBy} from 'lodash';

const GPlot = glamorous(Plot)({
  width: '100%',
  height: 600,
});

class Pie extends React.Component {
  render() {
    const {data, useCountBy} = this.props;
    const input = useCountBy ? countBy(data) : data;
    return (
      <GPlot
        useResizeHandler={true}
        data={[
          {
            values: Object.values(input),
            labels: Object.keys(input),
            type: 'pie',
            text: Object.values(input),
            direction: 'clockwise',
            rotation: 0,
            hole: 0.3,
          },
        ]}
        layout={{autosize: true, title: ''}}
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
