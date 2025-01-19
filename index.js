fetch('http://www.omdbapi.com/?apikey=6d084915&s=fast')
.then(Response => JSON())
.then(data => {
    console.log(data);
})
.catch(error => console.error('Error fetching data:', error));

console.log(fetch(`http://www.omdbapi.com/?apikey=6d084915&s=fast`));
//function loadMovies(){


//const moviesWrapper = `http://www.omdbapi.com/?apikey=6d084915&s=fast`

//const moviesList = getMoveis
//async function 

// FAKE DATA

