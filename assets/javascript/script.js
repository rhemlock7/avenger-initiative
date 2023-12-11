// Store HTML elements in variables
var heroDetailDiv = document.querySelector('#hero-details')
var workoutDetailsDiv = document.querySelector("#workout-details")
var hulk = 'Iron Man'
var captain = 'Captain America'
var heroDetailDiv = document.querySelector('#hero-details');
var weeklyViewContainer = document.querySelector('#weekly-container');
var workoutDropdown = document.querySelector('#workout-dropdown')
var workoutIndex = 0;
var workoutData;
var heroDifficulty;

// Event Listener on hero dropdown
heroselectformEl = $("#hero-select-form")
heroselectformEl.on('change', function (event) {

    let hero = event.target.value;
    heroDifficulty = $(this).find(":selected").data("difficulty")

    // Stores hero values in local storage
    localStorage.setItem("hero", hero);
    localStorage.setItem("heroDifficulty", heroDifficulty)

    getHeroInfo(hero)

})

// Function that takes the hero data and displays it on screen
function getHeroInfo(input) {

    // Gets hero values from local storage
    let storedHero = localStorage.getItem("hero");
    heroDifficulty = localStorage.getItem("heroDifficulty");

    let localHero;

    // If there is a user input, use that input. Otherwise use what is in local storage.
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

                //Display weekly workout split based on the hero's difficulty
                createWeeklyView(heroDifficulty)
                getWorkoutData();
            })
    }
}


//MUSTAPHA: fetches the workout api and responds with a JSON 
workoutsEl = document.querySelector("#workouts")
workoutsEl.addEventListener('change', getWorkoutData)

function getWorkoutData(event) {
    if (heroDifficulty === "expert") {
        heroDifficulty = "intermediate"
    }

    let muscle;

    // If there is a user event, use that input. Otherwise default to chest workouts as the starter to display.
    if (event) {
        muscle = event.target.value;
    } else {
        muscle = "chest";
    }

    var level = "difficulty=" + heroDifficulty + "&";


    fetch(`https://api.api-ninjas.com/v1/exercises?${level}muscle=${muscle}`, {
        headers: {
            "X-Api-Key": "tFQ/n5S4oNe5c3vERyx93Q==960u5EA6MmusTREM"
        }
    })
        .then(res => res.json())
        .then(data => {
            workoutData = data;
            showsWorkouts();
        })

}

// Displays the next workout in the list
function nextBtnFunction() {
    if (workoutIndex < 6) {
        prevBtn.classList.remove('diable-btn')
        workoutIndex++;
        showsWorkouts(workoutIndex);
        prevBtn.classList.remove('hide')

        if (workoutIndex === 6) {
            nextBtn.classList.add('diable-btn')
        }
    }
}

// Displays the previous workout in the list
function prevBtnFunction() {
    if (workoutIndex > 0) {
        nextBtn.classList.remove('diable-btn')
        workoutIndex--;
        showsWorkouts(workoutIndex);
        prevBtn.classList.remove('diable-btn')

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


    //MUSTAPHA: creates elements for retrieved data
    var workoutNameEl = document.createElement('li')
    var categoryEl = document.createElement('li')
    var muscleEl = document.createElement('li')
    var equipmentEl = document.createElement('li')
    var instrEl = document.createElement('li')
    instrEl.setAttribute("style", "font-size: 15px; font-family:roboto")
    workoutNameEl.setAttribute("style", "font-size:1.75em;")
    categoryEl.setAttribute("style", "font-size: 1.75em;")
    muscleEl.setAttribute("style", "font-size: 1.75em;")
    equipmentEl.setAttribute("style", "font-size: 1.75em;")
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

//Tyler Section Changing color pallet for when hero is selected. Being called within the event listener on the form id.
function heroColorPallet(hero) {
    if (hero === "Captain America") {
        document.querySelector("#header").setAttribute('style', 'background-image: linear-gradient(100deg, #0e103f 3%, white 50%, #aa1428 100%)')
        document.querySelector("h1").setAttribute('style', 'color: black')
        document.body.setAttribute("style", "background-color: #0e103f; color: white");
        document.querySelector("#colorPallet").setAttribute("style", "background-color: #aa1428; border-color: #aa1428")
        document.querySelector("#daily-routine-container").setAttribute("style", "background-color: #aa1428")
        weeklyViewContainer.setAttribute("style", "background-color: #aa1428; border-color: white")
        prevBtn.setAttribute("style", "background-color: white; color: #aa1428;");
        nextBtn.setAttribute("style", "background-color: white; color: #aa1428;");
    } else if (hero === "Hulk") {
        document.querySelector("#header").setAttribute('style', 'background-image: linear-gradient(225deg, #28A36E 3%, white 50%, #533668 100%);')
        document.querySelector("h1").setAttribute('style', 'color: black')
        document.body.setAttribute("style", "background-color: #533668; color: white;");
        document.querySelector("#colorPallet").setAttribute("style", "background-color: #28A36E")
        document.querySelector("#daily-routine-container").setAttribute("style", "background-color: #28A36E")
        weeklyViewContainer.setAttribute("style", "background-color: #28A36E")
        prevBtn.setAttribute("style", "background-color: #533668; color: #28A36E;");
        nextBtn.setAttribute("style", "background-color: #533668; color: #28A36E;");
    } else if (hero === "Black Widow") {
        document.querySelector("#header").setAttribute('style', 'background-image: linear-gradient(225deg, #7A1F1E 3%, #5f0e0e 50%, #363131 100%)')
        document.querySelector("h1").setAttribute('style', 'color: black')
        document.body.setAttribute("style", "background-color: #645957;");
        document.querySelector("#colorPallet").setAttribute("style", "background-color: #F7CBB2; color: black")
        document.querySelector("#daily-routine-container").setAttribute("style", "background-color: #F7CBB2")
        weeklyViewContainer.setAttribute("style", "background-color: #F7CBB2")
        prevBtn.setAttribute("style", "background-color: #645957; color: #F7CBB2;");
        nextBtn.setAttribute("style", "background-color: #645957; color: #F7CBB2;");
    } else if (hero === "Thor") {
        document.querySelector("#header").setAttribute('style', 'background-image: linear-gradient(225deg, #b80000 3%, #F7CBB2 50%, #645957 100%)')
        document.querySelector("h1").setAttribute('style', 'color: black')
        document.body.setAttribute("style", "background-color: #363131;");
        document.querySelector("#colorPallet").setAttribute("style", "background-color: #b80000; color: black")
        document.querySelector("#daily-routine-container").setAttribute("style", "background-color: #b80000")
        weeklyViewContainer.setAttribute("style", "background-color: #b80000")
        prevBtn.setAttribute("style", "background-color: #dadada; color: #b80000;");
        nextBtn.setAttribute("style", "background-color: #dadada; color: #b80000;");
    }
}

// Function used to create weekly workout container.
function createWeeklyView(heroDifficulty) {
    var weeklyWorkoutContainer = document.createElement('div');
    weeklyWorkoutContainer.setAttribute("id", "workout-weekly-container")
    weeklyWorkoutContainer.classList.add("flex-col", "md:flex-row")

    // Workout splits and days of week stored in this object
    var daysOfWeek = [
        {
            day: "Sunday",
            beginner: "Rest",
            intermediate: "Rest",
            expert: "Rest"
        },
        {
            day: "Monday",
            beginner: "Chest",
            intermediate: "Chest",
            expert: "Chest"
        },
        {
            day: "Tuesday",
            beginner: "Rest",
            intermediate: "Rest",
            expert: "Lats"
        },
        {
            day: "Wednesday",
            beginner: "Lats",
            intermediate: "Lats",
            expert: "Rest"
        },
        {
            day: "Thursday",
            beginner: "Rest",
            intermediate: "Quadriceps",
            expert: "Quadriceps"
        },
        {
            day: "Friday",
            beginner: "Quadriceps",
            intermediate: "Biceps",
            expert: "Shoulders"
        },
        {
            day: "Saturday",
            beginner: "Rest",
            intermediate: "Rest",
            expert: "Biceps"
        },
    ]

    // Removes the previous weekly view to make room for the new one
    if (weeklyViewContainer.hasChildNodes()) {
        // Loop backward to remove all children
        for (let i = weeklyViewContainer.children.length - 1; i >= 0; i--) {
            weeklyViewContainer.removeChild(weeklyViewContainer.children[i]);
        }
    }

    // Removes the previous dropdown options to make room for new ones
    if (workoutDropdown.hasChildNodes()) {
        // Loop backward to remove all children
        for (let i = workoutDropdown.children.length - 1; i >= 0; i--) {
            workoutDropdown.removeChild(workoutDropdown.children[i]);
        }
    }

    // Creates a card for each day of the week and appends it to the weekly container
    for (i = 0; i < 7; i++) {
        if (heroDifficulty === "beginner") {
            difficulty = daysOfWeek[i].beginner;
        } else if (heroDifficulty === "intermediate") {
            difficulty = daysOfWeek[i].intermediate;
        } else if (heroDifficulty === "expert") {
            difficulty = daysOfWeek[i].expert;
        } else {
            difficulty = ""
        }

        // Create HTML Elements
        var dayOfWeekContainer = document.createElement('div');
        var dayOfWeekTitle = document.createElement('h4');
        var workoutTitle = document.createElement('h5');
        var dayOfWeekDetails = document.createElement('p');
        var workoutOption = document.createElement('option');

        // Set styling for daysOfWeek cards
        dayOfWeekContainer.setAttribute("style", "background-color:black; color:white; height:150px; padding:10px; margin-top:15px; text-align:left;")
        dayOfWeekContainer.classList.add("w-full", "md:w-1/10", "md:m-1")
        dayOfWeekTitle.setAttribute("style", "font-size: 1.5em;")
        workoutTitle.setAttribute("style", "margin-top:10px;")
        dayOfWeekDetails.setAttribute("style", "margin-top:10px;")

        // Option dropdown attributes
        workoutOption.textContent = "Select Workout"
        if (difficulty !== "Rest") {
            workoutOption.textContent = difficulty;
            workoutOption.setAttribute("value", difficulty.toLowerCase())

            // Append workout options to the dropdown
            workoutDropdown.append(workoutOption)
        }

        // Set textContent for each element
        dayOfWeekTitle.textContent = daysOfWeek[i].day;
        workoutTitle.textContent = "Goal:"
        dayOfWeekDetails.textContent = difficulty;

        // Append Text to DayOfWeek div
        dayOfWeekContainer.append(dayOfWeekTitle);
        dayOfWeekContainer.append(workoutTitle);
        dayOfWeekContainer.append(dayOfWeekDetails);

        // Append daysOfWeek containers to weeklyView container
        weeklyWorkoutContainer.append(dayOfWeekContainer)
        weeklyViewContainer.append(weeklyWorkoutContainer)
    }

    // display workouts
    getWorkoutData();
}

// Calls function immediately to get hero from local storage

//#Animate Lightning
function lightningAnimate() {
    let leftLightEl = document.querySelector("#leftLight")
    let rightLightEl = document.querySelector("#rightLight")
    let leftLightFrame2El = document.querySelector("#leftLightFrame2")
    let rightLightFrame2El = document.querySelector("#rightLightFrame2")
    let hideEl = "d-none"
    let unhideEl = "d-xl-block"
    let displaySwitchframe1 = [unhideEl, hideEl]
    count = 0
    setInterval(function () {
        if (count > 1) {
            count = 0
        }
        leftLightEl.classList.remove(displaySwitchframe1[count - 1])
        rightLightEl.classList.remove(displaySwitchframe1[count - 1])
        leftLightEl.classList.add(displaySwitchframe1[count])
        rightLightEl.classList.add(displaySwitchframe1[count])
        if (count === 1) {
            leftLightFrame2El.classList.add("d-xl-block", "ml-10")
            rightLightFrame2El.classList.add("d-xl-block", "mr-10")
        } else {
            leftLightFrame2El.classList.remove("d-xl-block")
            rightLightFrame2El.classList.remove("d-xl-block")
        }
        count += 1
    }
        , 600)
}

// Calls function immediately to get hero information from local storage
getHeroInfo()
lightningAnimate()
