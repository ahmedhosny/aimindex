// http://www.material-ui.com/#/customization/colors
// https://github.com/plotly/plotly.js/blob/master/src/components/modebar/buttons.js
//
const theme = {
  background: '#f7fcfc',
  orange: '#ffab40',
  lightTeal: '#009688',
  darkTeal: '#00796b',
  tealScale: [
    [0, '#f7fcfc'],
    [0.000000000001, '#E0F2F1'],
    [0.2, '#B2DFDB'],
    [0.3, '#80CBC4'],
    [0.4, '#4DB6AC'],
    [0.5, '#26A69A'],
    [0.6, '#009688'],
    [0.7, '#00897B'],
    [0.8, '#00796B'],
    [0.9, '#00695C'],
    [1, '#004D40'],
  ],
  tealPie: [
    '#004D40',
    '#00695C',
    '#00796B',
    '#00897B',
    '#009688',
    '#26A69A',
    '#4DB6AC',
    '#80CBC4',
    '#B2DFDB',
    '#E0F2F1',
  ],
  plotlyConfig: {
    // displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: [
      'sendDataToCloud',
      'sendDataToCloud',
      'hoverCompareCartesian',
      'hoverClosestPie',
    ],
  },
};
export default theme;
