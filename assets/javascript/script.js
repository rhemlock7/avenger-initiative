var hulk = 'Hulk'
fetch(`https://gateway.marvel.com:443/v1/public/characters?name=${hulk}&apikey=851e0da0c6b577d3681246bac28477e8`)
.then(res => res.json())
.then(data => { console.log(marvelData); })


fetch('apikey=cc4333db4938d18f524710563c07f5b9843cfbc7')
.then(res => res.json())
.then(data => { console.log(workoutData) })

// #get both API's fetching data
    //*Marvel currently complete
    //TODO: Workout API

// #Add event listening on form
    //TODO: Need prevent default since it's a form
    //TODO: Function that fetches the API's by listening to if the value has changed within the selector?

// #
