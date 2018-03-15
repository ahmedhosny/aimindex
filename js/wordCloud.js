function drawCloud(data){
  // console.log(data.slice(0,100))
  const width = document.getElementById('Cloud').offsetWidth;
    var layout = d3.layout.cloud()
      .size([width, 500])
      .words(data.slice(0,100).map(function(d) {
        return {text: d.word, size: 10 + d.count };
      }))
      .padding(5)
      .rotate(function() { return 0; })
      .font("Roboto")
      .fontSize(function(d) { return d.size; })
      .on("end", draw);
  layout.start();

  function draw(words) {
    d3.select("#Cloud").append("svg")
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .attr("class", "graph-svg-component")
      .append("g")
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size + "px"; })
        .style("font-family", "Roboto")
        .style("fill", function(d, i) { return "#616161" })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
  }
}
