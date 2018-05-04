import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Plot from 'react-plotly.js';
import {countBy} from 'lodash';
import theme from '../theme.js';

const GPlot = glamorous(Plot)({
  width: '100%',
});

/**
 * choropleth
 * @extends React
 */
class Choro extends React.Component {
  /**
   * Renders the world map
   * @return {ReactElement}
   */
  render() {
    const {data} = this.props;
    const input = countBy(data);
    return (
      <GPlot
        useResizeHandler={true}
        showLink={false}
        data={[
          {
            type: 'choropleth',
            locationmode: 'country names',
            locations: Object.keys(input),
            z: Object.values(input),
            text: Object.keys(input),
            colorscale: theme.tealScale,
            autocolorscale: false,
            reversescale: false,
            marker: {
              line: {
                color: 'rgb(180,180,180)',
                width: 0.5,
              },
            },
            tick0: 0,
            zmin: 0,
            dtick: 1000,
            colorbar: {
              autotic: false,
              thickness: 10,
              tickprefix: '',
              title: 'Publications',
              len: 0.7,
            },
          },
        ]}
        layout={{
          margin: {
            l: 0,
            r: 0,
            b: 10,
            t: 10,
            pad: 4,
          },
          title: '',
          geo: {
            scale: 2,
            resolution: 300,
            showcountries: true,
            countrycolor: '#696969',
            countrywidth: 0.5,
            scope: 'world',
            showframe: false,
            showcoastlines: false,
            projection: {
              type: 'mercator',
            },
          },
        }}
        config={theme.plotlyConfig}
      />
    );
  }
}
Choro.propTypes = {
  data: PropTypes.array.isRequired,
};
export default Choro;
