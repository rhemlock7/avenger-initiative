// Store HTML elements in variables
var heroDetailDiv = document.querySelector('#hero-details')

var hulk = 'Iron Man'
var captain = 'Captain America'

fetch(`https://gateway.marvel.com:443/v1/public/characters?name=${hulk}&apikey=851e0da0c6b577d3681246bac28477e8`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        console.log(data.data.results[0])
        console.log("Name: " + data.data.results[0].name)
        console.log("Image Link: " + data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension)
        console.log("Description: " + data.data.results[0].description)

        // Create HTML elements
        var heroImage = document.createElement('img');
        var heroNameH3 = document.createElement('h3');
        var heroDescription = document.createElement('p');

        // Set HTML elements' text content to be hero data
        heroImage.setAttribute("src", data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension);
        heroImage.setAttribute("style", "width:50%; border-radius:24px; margin:15px 0")
        heroNameH3.textContent = data.data.results[0].name;
        heroNameH3.setAttribute("style", "font-size:3em;")
        heroDescription.textContent = data.data.results[0].description;

        heroDetailDiv.append(heroImage);
        heroDetailDiv.append(heroNameH3);
        heroDetailDiv.append(heroDescription);

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

    heroselectformEl = document.querySelector("#hero-select-form")
    heroselectformEl.addEventListener('change', function() {
        let options = document.querySelector("#hero-select-dropdown")
        console.log(options)
        if (options.value === "captain") {
            console.log("I am america")
        } else if (options.value === "hulk") {
            console.log("I am hulk")
        } 
    })
    