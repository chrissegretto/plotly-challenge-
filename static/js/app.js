// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("./samples.json").then((samplesData) => {
    console.log(samplesData);
   // Use D3 to select the dropdown menu
   var dropdownMenu = d3.select("#selDataset");
   sdata = samplesData.names
   console.log(sdata)
    sdata.forEach(element => {
        dropdownMenu.append("option").text(element)

    });
  
    optionChanged(sdata[0])
    });
function demoinfo(id){
    d3.json("./samples.json").then((demoData) => {
        console.log(demoData);
       // Use D3 to select the dropdown menu
       var demoinfobox = d3.select("#sample-metadata");
       mdata = demoData.metadata  
       //Clearing existing list 
       demoinfobox.html('')
       filtermdata = mdata.filter(md=> md.id == id)[0] 
       Object.entries(filtermdata).forEach(([key,value])=>{
           demoinfobox.append("option").text(`${key};${value}`)
   
        })
});
};

function optionChanged(testid){
    demoinfo(testid)
    chart(testid)

}
function chart(testid){
    d3.json("./samples.json").then((demoData) => {
        console.log(demoData.samples)
        samplesData = demoData.samples
        console.log(samplesData)
        filtersamplesData = samplesData.filter(sd=> sd.id == testid)[0]  
        sv = filtersamplesData.sample_values.slice(0,10).reverse();
        console.log(filtersamplesData.sample_values)
        otu = filtersamplesData.otu_ids.slice(0,10).reverse().map(d=>"otu"+""+d);
        console.log(filtersamplesData.otu_ids)
        labels = filtersamplesData.otu_labels.slice(0,10).reverse();
        console.log(filtersamplesData.otu_labels)
        trace=[{x:sv, 
            y:otu,
            text:labels,
            type:"bar",
            orientation:"h"

        }]
        Plotly.newPlot("bar",trace);
        trace2=[{
            x:filtersamplesData.otu_ids,
            y:filtersamplesData.sample_values,
            text:filtersamplesData.otu_labels,
            mode:"markers",
            marker:{color:filtersamplesData.otu_ids,size:filtersamplesData.sample_values}


        }]
        Plotly.newPlot("bubble",trace2)
    });
}