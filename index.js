let movies = [];

async function loadMovies(filter = '') {
    const moviesWrapper = document.querySelector('.movies');
    const loadingSpinner = document.querySelector('.movies__loading');
    

    loadingSpinner.style.display = 'flex';
    moviesWrapper.innerHTML = '';
    try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=6d084915&s=fast`);
        const data = await response.json();
        
        if (data.Response === 'True') {
            movies = data.Search;

            const moviesHtml = movies
                .map((movie) => {
                    return `
                        <div class="movie">
                            <figure class="movie__img--wrapper">
                                <img class="movie__img" src="${movie.Poster}" alt="${movie.Title}">
                            </figure>
                            <div class="movie__title">${movie.Title}</div>
                            <div class="movie__year">${movie.Year}</div>
                        </div>
                    `;
                })
                .join("");
            moviesWrapper.innerHTML = moviesHtml;
        } else {
            moviesWrapper.innerHTML = `<p>No movies found for "fast". Please try a different search term.</p>`;
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        moviesWrapper.innerHTML = `<p>There was an error fetching the movie data. Please try again later.</p>`;
    } finally {
       
        loadingSpinner.style.display = 'none';
    }
}

function filterMovies(event) {
    const filter = event.target.value;
    loadMovies(filter); 

}

const searchInput = document.querySelector('#movie-search');
searchInput.addEventListener('input', filterMovies); 
