// #get both API's fetching data
    //*Marvel currently complete
    //TODO: Workout API

// #Add event listening on form
    //TODO: Need prevent default since it's a form
    //TODO: Function that fetches the API's by listening to if the value has changed within the selector?



    // function HeroSeleted(e) {
    //     e.preventDefault()
    //     console.log(HeroSeleted)
    // }
    heroselectformEl = document.querySelector("#hero-select-form")
    console.log(heroselectformEl)

    heroselectformEl.addEventListener('change', function(event) {
        let options = document.querySelector("#hero-select-dropdown")
        if (options.children[1].innerHTML === "Captain America") {
            console.log("I am america")

        } else if (options.children[2].innerHTML === "Hulk") {
            console.log("I am hulk")
        }
    })
    
    
