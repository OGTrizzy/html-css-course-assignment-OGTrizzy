import { updateCart } from "./filter.mjs";

function generateHtmlForItem(movie){
    const movieWrapper = document.createElement('div');
    const movieTitle = document.createElement('h5');
    movieTitle.textContent = movie.title;
    movieWrapper.appendChild(movieTitle); 

    const moviePrice = document.createElement('p');
    moviePrice.textContent = movie.price + 'KR';
    movieWrapper.appendChild(moviePrice);

    const removeOneButton = document.createElement('button');  //this is not working for some reason, i didnt have enough time to fix this
    removeOneButton.textContent = 'remove one';
    removeOneButton.addEventListener('click', function() {
        removeFromCart(movie, 1);
    });
    movieWrapper.appendChild(removeOneButton);

    return movieWrapper;
}

function removeFromCart(item, count) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    for (let i = 0; i < count; i++) {
        const index = cart.findIndex((movie) => movie.id === item.id);
        if (index > -1) {
            cart.splice(index, 1);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function displayCartItems(){
    const titleContainer = document.getElementById('movie-title');
    const priceContainer = document.getElementById('movie-price');
    const cart = JSON.parse(localStorage.getItem('cart'));

    let movieCounts = {};
    let moviePrices = {};

    cart.forEach(function (currentItem){
        if (movieCounts[currentItem.title]){
            movieCounts[currentItem.title] += 1;
            moviePrices[currentItem.title] += currentItem.price;
        } else {
            movieCounts[currentItem.title] = 1;
            moviePrices[currentItem.title] = currentItem.price;
        }
    });

    let total = 0;

    for (let movie in movieCounts) {
        const movieTitle = document.createElement('p');
        movieTitle.textContent = movie + '(' + movieCounts[movie] + ')';
        titleContainer.appendChild(movieTitle);

        const moviePrice = document.createElement('p');
        moviePrice.textContent = moviePrices[movie] + " KR";
        priceContainer.appendChild(moviePrice);

        total += moviePrices[movie];
    }
    const totalPrice = document.createElement('p');
    totalPrice.textContent = 'Total: ' + total + 'KR';
    priceContainer.appendChild(totalPrice);

    const removeAllButton = document.createElement('button');
    removeAllButton.textContent = 'remove all';
    removeAllButton.addEventListener("click", function () {
        localStorage.setItem('cart',JSON.stringify([]));
        updateCart();
        location.reload(); //figured  this was the best way to refresh page after removing everything from cart, but kind of wonky but as long it works im happy
    });
    priceContainer.appendChild(removeAllButton);
}



async function main(){
    displayCartItems();
    generateHtmlForItem();
}

main();