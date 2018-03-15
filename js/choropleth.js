function unpack(rows, key) {
  return rows.map(function(row) {
    return row[key];
  });
}

function drawChoropleth(formatedData, name) {
  const count = _.countBy(formatedData);
  var data = [
    {
      type: "choropleth",
      locationmode: "country names",
      locations: Object.keys(count),
      z: Object.values(count),
      text: Object.keys(count),
      // colorscale: [[0,'rgb(5, 10, 172)'],[0.35,'rgb(40, 60, 190)'],[0.5,'rgb(70, 100, 245)'], [0.6,'rgb(90, 120, 245)'],[0.7,'rgb(106, 137, 247)'],[1,'rgb(220, 220, 220)']],
      // autocolorscale: false,
      // reversescale: true,
      // marker: {
      //   line: {
      //     color: 'rgb(180,180,180)',
      //     width: 0.5
      //   }
      // },
      //
      //
      //
      //
      tick0: 0,
      zmin: 0,
      dtick: 1000,
      colorbar: {
        autotic: false,
        thickness: 10,
        tickprefix: "",
        title: "Publications"
      }
    }
  ];

  var layout = {
    margin: {
      l: 0,
      r: 0,
      b: 10,
      t: 10,
      pad: 4
    },
    title: "",
    geo: {
      scale: 2,
      resolution: 300,
      showcountries: true,
      countrycolor: "#696969",
      countrywidth: 0.5,
      scope: "world",
      showframe: false,
      showcoastlines: false,
      projection: {
        type: "mercator"
      }
    }
  };
  Plotly.plot("Choropleth", data, layout, { showLink: false });
}
