function displayMovieInfo(){
    const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
    const titleElement = document.getElementById('title');
    titleElement.textContent = selectedMovie.title;
    const descriptionElement = document.getElementById('description');
    descriptionElement.textContent = selectedMovie.description;
    const genreElement = document.getElementById('genre');
    genreElement.textContent = selectedMovie.genre;
    const priceElement = document.getElementById('price');
    priceElement.textContent = selectedMovie.price + ' KR';
    const imageElement = document.getElementById('image');
    imageElement.src = selectedMovie.image;
}

window.onload = displayMovieInfo;