import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Plot from 'react-plotly.js';
import {countBy} from 'lodash';

const GPlot = glamorous(Plot)({
  width: '100%',
});

class Choro extends React.Component {
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
            // colorscale: [[0,'rgb(5, 10, 172)'],[0.35,'rgb(40, 60, 190)'],[0.5,'rgb(70, 100, 245)'], [0.6,'rgb(90, 120, 245)'],[0.7,'rgb(106, 137, 247)'],[1,'rgb(220, 220, 220)']],
            // autocolorscale: false,
            // reversescale: true,
            // marker: {
            //   line: {
            //     color: 'rgb(180,180,180)',
            //     width: 0.5
            //   }
            // },
            tick0: 0,
            zmin: 0,
            dtick: 1000,
            colorbar: {
              autotic: false,
              thickness: 10,
              tickprefix: '',
              title: 'Publications',
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
      />
    );
  }
}
Choro.propTypes = {
  data: PropTypes.array.isRequired,
};
export default Choro;

// Plotly.plot("Choropleth", data, layout, {  });
// }
