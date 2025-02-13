let movies = [];

async function loadMovies(filter = ''){
    const moviesWrapper = document.querySelector('.movies');
    const loadingSpinner = document.querySelector('.movies__loading');
    const title = document.querySelector('.movie-search').value


    if(title === ''){
        loadingSpinner.style.display = 'none';
        moviesWrapper.innerHTML = '';
        return;
    }
    loadingSpinner.style.display = 'flex';
    moviesWrapper.innerHTML = '';
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=6d084915&s=${title || ""}`);
        const data = await response.json();
        
        if (data.Response === 'True') {
            movies = data.Search.slice(0,6);

            if (filter) {
                movies = applyFilter(movies,filter)
            }
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
            moviesWrapper.innerHTML = `<p>No movies found. Please try a different search term.</p>`;
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        moviesWrapper.innerHTML = `<p>There was an error fetching the movie data. Please try again later.</p>`;
    } finally {
       
        loadingSpinner.style.display = 'none';
    }
}
function applyFilter(movies, filter){
    switch (filter) {
        case 'OLD_TO_NEW':
            return movies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
        case 'NEW_TO_OLD':
            return movies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
        default:
            return movies;
    }
}

function filterMovies(event) {
    const filter = event.target.value;
    loadMovies(filter);

}

const searchInput = document.querySelector('#movie-search');
searchInput.addEventListener('input', filterMovies); 


const toggleMenu = document.querySelector('.toggle-meun');
const modal = document.querySelector('.modal');

toggleMenu.addEventListener('click', () => {
   if (modal.style.display === 'flex') {
    modal.style.display = 'none';
   } else {
    modal.style.display = 'flex';
   }
});

const modalLinks = document.querySelectorAll('.modal a');
modalLinks.forEach(link =>{
    link.addEventListener('click', () => {
        modal.style.display = 'none';
    })
})
