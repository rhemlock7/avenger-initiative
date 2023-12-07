// Store HTML elements in variables
var heroDetailDiv = document.querySelector('#hero-details');
var weeklyViewContainer = document.querySelector('#weekly-container');

var ironMan = 'Iron Man';
var hulk = 'Hulk';
var captain = 'Captain America';

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
        heroImage.setAttribute("style", "max-width:400px; width:50%; border-radius:24px; margin:15px 0")
        heroNameH3.textContent = data.data.results[0].name;
        heroNameH3.setAttribute("style", "font-size:3em;")
        heroDescription.textContent = data.data.results[0].description;
        heroDescription.setAttribute("style", "width:75%;")

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

function createWeeklyView() {
    var weeklyWorkoutContainer = document.createElement('div');
    weeklyWorkoutContainer.setAttribute("id", "workout-weekly-container")
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    for (i = 0; i < 7; i++) {

        // Create HTML Elements
        var dayOfWeekContainer = document.createElement('div');
        var dayOfWeekTitle = document.createElement('h4');
        var dayOfWeekDetails = document.createElement('p');

        // Set styling for daysOfWeek

        dayOfWeekContainer.setAttribute("style", "background-color:black; color:white; height:150px; padding:10px; margin-top:15px; text-align:left; width:13.5%")
        dayOfWeekTitle.setAttribute("style", "font-size: 1.5em;")
        dayOfWeekDetails.setAttribute("style", "margin-top:20px;")

        // Set textContent for each element
        dayOfWeekTitle.textContent = daysOfWeek[i];
        dayOfWeekDetails.textContent = "Details will go here"

        // Append Text to DayOfWeek div
        dayOfWeekContainer.append(dayOfWeekTitle);
        dayOfWeekContainer.append(dayOfWeekDetails);

        // Append daysOfWeek containers to weeklyView container
        weeklyWorkoutContainer.append(dayOfWeekContainer)
        weeklyViewContainer.append(weeklyWorkoutContainer)
    }

    //weeklyViewContainer
}

heroselectformEl = document.querySelector("#hero-select-form")
heroselectformEl.addEventListener('change', function () {
    let options = document.querySelector("#hero-select-dropdown")
    console.log(options)
    if (options.value === "captain") {
        console.log("I am america")
    } else if (options.value === "hulk") {
        console.log("I am hulk")
    }
})

createWeeklyView();