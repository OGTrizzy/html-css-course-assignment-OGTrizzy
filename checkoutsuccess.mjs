import { updateCart } from "./filter.mjs";

function summary(){
    const cart = JSON.parse(localStorage.getItem('cart'));

    let total = 0;
    cart.forEach(function(currentItem){
        total += currentItem.price;
    });

    const summaryText = document.createElement('p');
    summaryText.textContent = `you have bought ${cart.length} movies for a total of ${total}KR`;

    const priceContainer = document.getElementById('priceContainer');
    if (priceContainer) {
        priceContainer.appendChild(summaryText);
    } else {
        console.log("No element found with id 'priceContainer'");
    }
}

async function main(){
    updateCart();
    summary();
}

main();