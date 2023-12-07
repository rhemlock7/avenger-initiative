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
        } else {
  
        }
    })
    
    
