//- As a user, I want to remove a product from my basket.
function fetchMovies() {
  fetch('https://api.noroff.dev/api/v1/square-eyes')
    .then(response => response.json())
    .then(data => handleMovies(data))
    .catch(error => console.log(error));
}

function handleMovies(data) {
  const movieListDiv = document.getElementById('movieList');
  movieListDiv.innerHTML = '';

  data.forEach(movie => {
    const movieElement = document.createElement('p');
    movieElement.textContent = `${movie.title} (${movie.genre})`;

    if (movie.onSale) { // this checks if there is sale on the item
      const salePrice = movie.discountedPrice;
      movieElement.textContent += ` - On Sale for ${salePrice}KR`; 
    } else {
      movieElement.textContent += ` - ${movie.price}KR`;
    }

    movieElement.setAttribute('data-genre', movie.genre);
    movieListDiv.appendChild(movieElement);

    const movieImage = document.createElement('img');
    movieImage.className = 'movie-image';
    movieImage.src = movie.image;
    movieElement.appendChild(movieImage);
    movieImage.addEventListener('click', function(){
      localStorage.setItem('selectedMovie', JSON.stringify(movie));//this is the part that when you click on the image, you will be redirected to
      window.location.href = 'movieinfo.html';                                    //movie info page with more info about the movie, this is not ideal but it works 
    });


    const buyButton = document.createElement('button'); //this adds a add to cart button
    buyButton.textContent = 'Add to cart';
    buyButton.addEventListener('click', function() {
      addToCart(movie, data);
      location.reload();  //i added this because i figured it needed to reload to work properly, its wonky but it works
    });
    movieElement.appendChild(buyButton);
  });
}


let total = 0;
let cartCount = 0;

function createCart(){
  const cart = localStorage.getItem('cart');  // this is the way to create a cart in local storage
  if (!cart){
    localStorage.setItem('cart', JSON.stringify([]));
  }
}

function addToCart(item, data) { //this adds items to the cart in the local storage
  const cart = JSON.parse(localStorage.getItem('cart'));
  const selectedItem = data.find((movie) => movie.id === item.id);
  cart.push(selectedItem);
  localStorage.setItem('cart', JSON.stringify(cart));
  total += selectedItem.price;
  updateCart();
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  cartCount = cart.length;
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = 'Cart items: ' + cartCount;
  }
}

export function updateCart() { // this updates the cart
  const cart = JSON.parse(localStorage.getItem('cart'));
  const cartElement = document.getElementById('cart');
  if (cartElement) {
    cartElement.innerHTML = '';
  
    //cart.forEach(item => {                    // this was me trying to get the list and this worked but not on the way i wanted it to but gave me insight
    //  const itemElement = document.createElement('p');
    //  itemElement.textContent = `${item.title} - ${item.price}KR`;
    //  cartElement.appendChild(itemElement);
    //});
  }
  
  total = 0; // Reset total each time you update the cart
  cart.forEach(item => {
    total += item.price;
  });
  
  //const totalElement = document.getElementById('total');  //i used this to get the total price for testing purposes
  //if (totalElement) {
  //  totalElement.textContent = total + 'KR';
  //} else {
  //  console.log("Element with id 'total' dont exist");
  //}
}

function filterMovies() {
  const genre = document.getElementById('genreFilter').value;
  const movies = document.querySelectorAll('#movieList p');

  movies.forEach(movie => {
    const movieGenre = movie.getAttribute('data-genre');
    if (genre === 'all' || genre === movieGenre) {
      movie.style.display = '';
    } else {
      movie.style.display = 'none';
    }
  });
}

async function main() {
  createCart();
  fetchMovies();
  document.getElementById('genreFilter').addEventListener('change', filterMovies);
  updateCartCount();
}
main();
