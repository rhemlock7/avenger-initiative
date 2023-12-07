var hulk = 'Hulk'
var Captain = 'Captain America'

fetch(`https://gateway.marvel.com:443/v1/public/characters?name=${Captain}&apikey=851e0da0c6b577d3681246bac28477e8`)
.then(res => res.json())
.then(data => { 
    console.log(data); 
    console.log(data.data.results[0])
    console.log("Name: " + data.data.results[0].name)
    console.log("Image Link: " + data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension)
    console.log("Description: " + data.data.results[0].description)
})


// fetch('apikey=cc4333db4938d18f524710563c07f5b9843cfbc7')
// .then(res => res.json())
// .then(data => { console.log(workoutData) })

// #get both API's fetching data
    //*Marvel currently complete
    //TODO: Workout API

// #Add event listening on form
    //TODO: Need prevent default since it's a form
    //TODO: Function that fetches the API's by listening to if the value has changed within the selector?

// #

// Hero Details to display on screen:
// 1. Hero Image
// 2. Hero name
// 3. Hero Description