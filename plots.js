function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
    buildMetadata(sampleNames[0]);
    buildCharts(sampleNames[0]);
})}

init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
};

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    var str1 = "ID: ";
    var res = str1.concat (result.id);
    PANEL.append("h6").text(res);

    var str2 = "ETHNICITY ";
    var res2 = str2.concat(result.ethnicity);
    PANEL.append("h6").text(res2);

    var str3= "GENDER: ";
    var res3 = str3.concat(result.gender); 
    PANEL.append("h6").text(res3);

    var str4= "AGE: ";
    var res4 = str4.concat(result.age);
    PANEL.append("h6").text(res4);

    var str5= "LOCATION: ";
    var res5= str5.concat(result.location)
    PANEL.append("h6").text(res5);

    var str6= "BBTYPE: ";
    var res6 = str6.concat(result.bbtype);
    PANEL.append("h6").text(res6);

    var str7= "WFREQ: ";
    var res7= str7.concat(result.wfreq);
    PANEL.append("h6").text(res7);
    
  });
};

function buildCharts(sample){
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    
    var otuIds = result.otu_ids
    var otuLabel = result.otu_labels
    var sampleValues = result.sample_values
  

    toptenValues = (sampleValues).slice(0,10).reverse();
    toptenOTUs = otuIds.slice(0,10).map(OTU => `OTU ${OTU}`).reverse();
  
  
  var trace1 = {
    x: toptenValues,
    y: toptenOTUs,
    text: otuLabel.slice(0,10).reverse(),
    name: "OTUs",
    type: "bar",
    orientation: "h"
    };

  // data
  var data = [trace1];

    // Apply the group bar mode to the layout
  var layout = {
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
  };
// Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", data, layout);

  var trace2 = {
    x: otuIds,
    y: sampleValues,
    text: otuLabel,
    mode: 'markers',
    marker: {
      color: otuIds,
      size: sampleValues,
      colorscale: 'Earth'
    }
  };
  
  data2 = [trace2];  
  Plotly.newPlot('bubble', data2);

})
};
  
  
