function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}
  
  // 1. Create the buildCharts function.
  function buildCharts(sample) {
  
    // 2. Use d3.json to load and retrieve the samples.json file 
    d3.json("samples.json").then((data) => {
  
      // 3. Create a variable that holds the samples array. 
      console.log(data);
      var samplesArray = data.samples;
      console.log(samplesArray);
  
      // 4. Create a variable that filters the samples for the object with the desired sample number.
      var selectedIdSamples = samplesArray.filter(data => data.id == sample);
      console.log(selectedIdSamples);
  
      //  5. Create a variable that holds the first sample in the array.
      var firstSample = selectedIdSamples[0];
      console.log(firstSample);
  
      // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
  var otuIds = firstSample.otu_ids;
        var otu_labels = firstSample.otu_labels;
        var sample_values = firstSample.sample_values;
        console.log(otuIds);
        console.log(otu_labels);
  

        
        console.log(sample_values);
  
      // 7. Create the yticks for the bar chart.
      // Hint: Get the the top 10 otu_ids and map them in descending order  
      //  so the otu_ids with the most bacteria are last. 
  
      var yticks = otuIds.slice(0,10).map(id => "OTU " + id).reverse();
        console.log(yticks);
  
      // 8. Create the trace for the bar chart. 
      var barData = [{
        x: sample_values.slice(0,10).reverse(),
        text: otu_labels.slice(0,10).reverse(),
        type: "bar"
        
      }];
      // 9. Create the layout for the bar chart. 
      var barLayout = {
        title: "The Top 10 Bacteria Cultures Found",
        yaxis: {
          tickmode: "array",
          tickvals: [0,1,2,3,4,5,6,7,8,9],
          ticktext: yticks
        },
        annotations: [{
          xref: 'paper',
          yref: 'paper',
          x: 0.5,
          xanchor: 'center',
          y: -0.25,
          yanchor: 'center',
          text: 'The bar chart displays the top 10 bacterial species (OTUs)<br>with the number of samples found in your belly button',
          showarrow: false
        }]
      };
      //console.log("hello");
      // 10. Use Plotly to plot the data with the layout. 
      Plotly.newPlot("bar", barData, barLayout, {responsive: true});
    });
  }

  // Bar and Bubble charts
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    
//////////////////////////////////////////////////////////////
    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 

    // 1. Create the trace for the bubble chart.
     var bubbleData = {
      x: otu_ids,
      y: sample_values,
      type:"bubble",
      mode: "markers",
      hovertext: otu_labels,
      marker: { 
        size: sample_values.map(value => value * 0.75),
        color: otu_ids,
        colorscale: "Earth"
      } 
    }
    var bubbleData = [bubbleData];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU ID"},
      margins:"autoexpand",
      hovermode: "closest",
      paper_bgcolor: "black",
      font: {color: "white"}
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
  });


}
// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      value: wfreq,
      title: {text:"<b>Belly Button Wahshing Frequency</b><br>Scrubs per Week"},
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: {visible: true, range: [0, 10], tickmode: "array"},
        bar: {color:"black"},
        steps: [
            { range: [0,2], color: "red"},
            { range: [2,4], color: "orange"},
            { range: [4,6], color: "yellow"},
            { range: [6,8], color: "#9acd32"},
            { range: [8,10], color: "green"}
        ]
      }
    ];
    
    
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 500, 
      height: 400, 
      margin: { t: 50, b: 0 },
      paper_bgcolor: "gray",
      font: {color: "white"}
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly. newPlot("gauge", gaugeData, gaugeLayout);
  });
}