// Store HTML elements in variables
var heroDetailDiv = document.querySelector('#hero-details')
var workoutDetailsDiv = document.querySelector("#workout-details")
var hulk = 'Iron Man'
var captain = 'Captain America'
var heroDetailDiv = document.querySelector('#hero-details');
var weeklyViewContainer = document.querySelector('#weekly-container');
var workoutIndex = 0;
var workoutData;
var heroDifficulty;

// Event Listener on hero dropdown
heroselectformEl = $("#hero-select-form")
heroselectformEl.on('change', function (event) {

    let hero = event.target.value;
    heroDifficulty = $(this).find(":selected").data("difficulty") 
    console.log(heroDifficulty)
    // console.log(hero);
    // console.log(event.target.getAttribute("data-difficulty"))
    // console.log(hero)
    // console.log(event.target.data)
    localStorage.setItem("hero", hero);
    localStorage.setItem("heroDifficulty", heroDifficulty)

    getHeroInfo(hero)

})

// Function that takes the hero data and displays it on screen
function getHeroInfo(input) {
    let storedHero = localStorage.getItem("hero");

    let localHero;

    if (input) {
        localHero = input;
    } else {
        localHero = storedHero;
    }

    heroColorPallet(localHero)

    if (storedHero != null) {
        fetch(`https://gateway.marvel.com:443/v1/public/characters?name=${localHero}&apikey=851e0da0c6b577d3681246bac28477e8`)
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            // console.log(data.data.results[0])
            // console.log("Name: " + data.data.results[0].name)
            // console.log("Image Link: " + data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension)
            // console.log("Description: " + data.data.results[0].description)

            function displayHero() {
                // Create HTML elements
                var heroImage = document.createElement('img');
                var heroNameH3 = document.createElement('h3');
                var heroDescription = document.createElement('p');

                // Set HTML elements' text content to be hero data
                heroImage.setAttribute("src", data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension);
                heroImage.setAttribute("alt", data.data.results[0].name);
                heroImage.setAttribute("style", "max-width:400px; width:50%; border-radius:24px; margin:15px 0")
                heroNameH3.textContent = data.data.results[0].name;
                heroNameH3.setAttribute("style", "font-size:3em;")
                heroDescription.textContent = data.data.results[0].description;
                heroDescription.setAttribute("style", "width:75%;")

                heroDetailDiv.append(heroImage);
                heroDetailDiv.append(heroNameH3);
                heroDetailDiv.append(heroDescription);
            }

            if (heroDetailDiv.hasChildNodes()) {
                // Loop backward to remove all children
                for (let i = heroDetailDiv.children.length - 1; i >= 0; i--) {
                    heroDetailDiv.removeChild(heroDetailDiv.children[i]);
                }

                displayHero()
            } else {
                displayHero();
            }

            //Change localHero to be heroDifficulty
            createWeeklyView(localHero)
        })
}
}


//MUSTAPHA: fetches the workout api and responds with a JSON 
workoutsEl = document.querySelector("#workouts")
workoutsEl.addEventListener('change', function (event) {


    let muscle = event.target.value;
    console.log(muscle);
    var level = "difficulty=" + heroDifficulty + "&";

    //${heroDifficulty}

    fetch(`https://api.api-ninjas.com/v1/exercises?${level}muscle=${muscle}`, {
        headers: {
            "X-Api-Key": "tFQ/n5S4oNe5c3vERyx93Q==960u5EA6MmusTREM"
        }
    })
        .then(res => res.json())
        .then(data => {

            console.log(data)
            workoutData = data;
            showsWorkouts();

        })

})
function nextBtnFunction() {
    if (workoutIndex < 6) {
        prevBtn.classList.remove('diable-btn')
        workoutIndex++;
        showsWorkouts(workoutIndex);
        console.log("you clicked me ")
        prevBtn.classList.remove('hide')
        console.log(workoutIndex)

        if (workoutIndex === 6) {
            nextBtn.classList.add('diable-btn')
        }
    }

}
function prevBtnFunction() {
    if (workoutIndex > 0) {
        nextBtn.classList.remove('diable-btn')
        workoutIndex--;
        showsWorkouts(workoutIndex);
        console.log("you clicked prev ")
        prevBtn.classList.remove('diable-btn')
        console.log(workoutIndex)

        if (workoutIndex === 0) {
            prevBtn.classList.add('diable-btn')
        }
    }



}

function showsWorkouts() {

    
    //removes hide from next buttom
    nextBtn.classList.remove('hide')
    //MUSTAPHA:removes all children before display new children
    if (workoutDetailsDiv.hasChildNodes()) {
        for (let i = workoutDetailsDiv.children.length - 1; i >= 0; i--) {
            workoutDetailsDiv.removeChild(workoutDetailsDiv.children[i]);
        }

    }
    //MUSTAPHA: created function for workouts to collect data and display in Daily View container
    var workoutName = workoutData[workoutIndex].name;
    var category = workoutData[workoutIndex].type;
    var muscle = workoutData[workoutIndex].muscle;
    var equipment = workoutData[workoutIndex].equipment;
    var instr = workoutData[workoutIndex].instructions;
    console.log(workoutName);
    console.log(category);
    console.log(muscle);
    console.log(equipment);
    console.log(instr);

    //MUSTAPHA: creates elements for retrieved data
    var workoutNameEl = document.createElement('li')
    var categoryEl = document.createElement('li')
    var muscleEl = document.createElement('li')
    var equipmentEl = document.createElement('li')
    var instrEl = document.createElement('li')
    instrEl.setAttribute("style", "font-size: 15px; font-family:roboto")
    workoutNameEl.textContent = "Workout - " + workoutName;
    categoryEl.textContent = "Type - " + category;
    muscleEl.textContent = "Muscle - " + muscle;
    equipmentEl.textContent = "Equipment - " + equipment;
    instrEl.textContent = instr;
    //MUSTAPHA:appends the created elements to the html
    workoutDetailsDiv.append(workoutNameEl)
    workoutDetailsDiv.append(categoryEl)
    workoutDetailsDiv.append(muscleEl)
    workoutDetailsDiv.append(equipmentEl)
    workoutDetailsDiv.append(instrEl)
    
}



//creates variables for event listener
var nextBtn = document.querySelector('#next');
var prevBtn = document.querySelector('#prev');
nextBtn.addEventListener("click", nextBtnFunction);
prevBtn.addEventListener("click", prevBtnFunction)

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
    
    //Tyler Section Changing color pallet for when hero is selected. Being called within the event listener on the form id.
    function heroColorPallet (hero) {
        if (hero === "Captain America") {
            document.querySelector("#header").setAttribute('style', 'background-image: linear-gradient(100deg, #0e103f 3%, white 50%, #aa1428 100%)')
            document.querySelector("h1").setAttribute('style', 'color: black')
            document.body.setAttribute("style", "background-color: #0e103f; color: white");
            document.querySelector("#colorPallet").setAttribute("style", "background-color: #aa1428; border-color: #aa1428")
            document.querySelector("#daily-routine-container").setAttribute("style", "background-color: #aa1428")
            document.querySelector("#weekly-container").setAttribute("style", "background-color: #aa1428; border-color: white")
            document.querySelector("#prev").setAttribute("style", "background-color: white; color: #aa1428;");
            document.querySelector("#next").setAttribute("style", "background-color: white; color: #aa1428;");
        } else if (hero === "Hulk") {
            document.querySelector("#header").setAttribute('style', 'background-image: linear-gradient(225deg, #28A36E 3%, white 50%, #533668 100%)')
            document.querySelector("h1").setAttribute('style', 'color: black')
            document.body.setAttribute("style", "background-color: #533668; color: white;");
            document.querySelector("#colorPallet").setAttribute("style", "background-color: #28A36E")
            document.querySelector("#daily-routine-container").setAttribute("style", "background-color: #28A36E")
            document.querySelector("#weekly-container").setAttribute("style", "background-color: #28A36E")
            document.querySelector("#prev").setAttribute("style", "background-color: #533668; color: #28A36E;");
            document.querySelector("#next").setAttribute("style", "background-color: #533668; color: #28A36E;");
        } else if (hero === "Black Widow") {
            document.querySelector("#header").setAttribute('style', 'background-image: linear-gradient(225deg, #7A1F1E 3%, #F7CBB2 50%, #645957 100%)')
            document.querySelector("h1").setAttribute('style', 'color: black')
            document.body.setAttribute("style", "background-color: #645957;");
            document.querySelector("#colorPallet").setAttribute("style", "background-color: #F7CBB2; color: black")
            document.querySelector("#daily-routine-container").setAttribute("style", "background-color: #F7CBB2")
            document.querySelector("#weekly-container").setAttribute("style", "background-color: #F7CBB2")
            document.querySelector("#prev").setAttribute("style", "background-color: #645957; color: #F7CBB2;");
            document.querySelector("#next").setAttribute("style", "background-color: #645957; color: #F7CBB2;");
        } 
    }

function createWeeklyView(heroValue) {
    var weeklyWorkoutContainer = document.createElement('div');
    weeklyWorkoutContainer.setAttribute("id", "workout-weekly-container")
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    if (weeklyViewContainer.hasChildNodes()) {
        // Loop backward to remove all children
        for (let i = weeklyViewContainer.children.length - 1; i >= 0; i--) {
            weeklyViewContainer.removeChild(weeklyViewContainer.children[i]);
        }
    }

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
        dayOfWeekDetails.textContent = "Your hero is " + heroValue;

        // Append Text to DayOfWeek div
        dayOfWeekContainer.append(dayOfWeekTitle);
        dayOfWeekContainer.append(dayOfWeekDetails);

        // Append daysOfWeek containers to weeklyView container
        weeklyWorkoutContainer.append(dayOfWeekContainer)
        weeklyViewContainer.append(weeklyWorkoutContainer)
    }

    //weeklyViewContainer
}

// Calls function immediately to get hero from local storage
getHeroInfo()
console.log(heroDifficulty)