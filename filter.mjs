import { API } from './API.mjs';

function getAllMovies(){
    fetch(API)
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
}

function filterMovies(movies, genre){
    return movies.filter(movie => movie.genre === genre);
}

document.getElementById('genreDropdown').addEventListener('change', (event) => {
    const chosenGenre = event.target.value;
    // Get all the movies and then filter them by genre
    getAllMovies()
    .then(movies => {
        const filteredMovies = filterMovies(movies, chosenGenre);
        updateMovieList(filteredMovies);
    });
});

console.log(getAllMovies());