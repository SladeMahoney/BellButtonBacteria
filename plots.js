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
//Build Bar Chart
//pull from overall object of data, and filter by sample selected in the dropdown bar
function buildCharts(sample){
  d3.json("samples.json").then((data) => {
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    //must filter the samples array by the first column ('id') so we only pull corresponding
    //data that has that id
    var result = resultArray[0];
    
    var otuIds = result.otu_ids
    var otuLabel = result.otu_labels
    var sampleValues = result.sample_values
  
//only want to show top ten samples found in subject to create simple, informative visual
//slice top 10 of sampleValues, and otuIds--remember* must also slice otuLabels to hover 
//all 3 categories, though not in the same key value pair, are aligned throughout the data in their array
    toptenValues = (sampleValues).slice(0,10).reverse();
    toptenOTUs = otuIds.slice(0,10).map(OTU => `OTU ${OTU}`).reverse();
  
  //format data to fit the graph how you want it 
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

  // Create a Bubble Chart 
  // Create new x/y values, markers, and size making things equal to the data. 
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

  //must put data and labels inside an array 

  data2 = [trace2];  

  //call function to graph bubble chart - must be the same as call in HTML code
  Plotly.newPlot('bubble', data2);

})
};
  
  
