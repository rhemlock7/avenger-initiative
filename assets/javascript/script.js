// Store HTML elements in variables
var heroDetailDiv = document.querySelector('#hero-details')
var workoutDetailsDiv = document.querySelector("#workout-details")
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





// https://api.api-ninjas.com/v1/exercises?muscle=
// tFQ/n5S4oNe5c3vERyx93Q==960u5EA6MmusTREM
muscle = "glutes"

fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`, {
    headers: {
        "X-Api-Key": "tFQ/n5S4oNe5c3vERyx93Q==960u5EA6MmusTREM"
    }
})
    .then(res => res.json())
    .then(data => {

        console.log(data)
        
   
   
        var workoutName = data[0].name;
        var category = data[0].type;
        var muscle = data[0].muscle;
        var equipment = data[0].equipment;
        var instr = data[0].instructions;

        console.log(workoutName);
        console.log(category);
        console.log(muscle);
        console.log(equipment);
        console.log(instr);
        
        var workoutNameEl = document.createElement('li')
        var categoryEl = document.createElement('li')
        var muscleEl = document.createElement('li')
        var equipmentEl = document.createElement('li')
        var instrEl = document.createElement('li')

        workoutNameEl.textContent = workoutName;
        categoryEl.textContent = category;
        muscleEl.textContent = muscle;
        equipmentEl.textContent = equipment;
        instrEl.textContent = instr;

        workoutDetailsDiv.append(workoutNameEl)
        workoutDetailsDiv.append(categoryEl)
        workoutDetailsDiv.append(muscleEl)
        workoutDetailsDiv.append(equipmentEl)
        workoutDetailsDiv.append(instrEl)
        console.log(workoutDetailsDiv);

    })
    



// #get both API's fetching data
//*Marvel currently complete
//TODO: Workout API

// #Add event listening on form
//TODO: Need prevent default since it's a form
//TODO: Function that fetches the API's by listening to if the value has changed within the selector?

workoutSelectorEl = document.querySelector("#workouts")
workoutSelectorEl.addEventListener('change', function () {
    let choice = document.querySelector("#workout-dropdown")
    console.log(choice)
    if (choice.value === "chest") {
        console.log(workoutName)
    } else if (options.value === "biceps") {
        console.log(muscle)

    }else if(options.value === "glutes") {
        console.log(instr)

   }else if(options.value === "abdominals") {
        console.log(category)
   }
})
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


        //     //loops through the data for the length of list in the data in incriments of 8 because the data shows every 3 hours
        //     for (let index = 0; index < data.list.length; index = index + 8) {

        //         //variable declarition for the 5 day forecast with index instead of 0 to increase by 8
        //         var weatherDate = data.list[index].dt_txt;
        //         var temp = data.list[index].main.temp;
        //         var windInfo = data.list[index].wind.speed;
        //         var humidity = data.list[index].main.humidity;
        //         var iconCode = data.list[index].weather[0].icon;
        //         var weatherIcon = fIcon + iconCode + "@2x.png";

        //         console.log(weatherDate);
        //         var cardInfo = $(`<li class="card col-lg-2 m-2"></li>`);
        //         var h4El = $("<h4>");
        //         h4El.text(weatherDate)
        //         var weatherIconEl = $('<img>').attr('src', weatherIcon);
        //         var tempEl = $('<p>').text("Temp: " + temp + " °F")
        //         var windInfoEl = $('<p>').text("Wind: " + windInfo + " MPH")
        //         var humidityEl = $('<p>').text("Humidity: " + humidity + " %")
        //         var cardContainer = $('.info');
        //         var cardDiv = $('<li>');

        //         //appends created elements to the page 
        //         cardInfo.append(h4El);
        //         cardInfo.append(weatherIconEl);
        //         cardInfo.append(tempEl);
        //         cardInfo.append(windInfoEl);
        //         cardInfo.append(humidityEl);
        //         cardSlot.append(cardInfo);
        //     }

        // });
