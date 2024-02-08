import { API } from './API.mjs';

let cart = [];


function addToCart(product, quantity = 1) {
    const isItemInCart = cart.find((currentProduct) => {
        if (currentProduct.id === product.id) {
            return true;
        }
        return false;
    });
    if (isItemInCart) {
        const itemIndex = cart.findIndex((currentProduct) =>{
            if (currentProduct.id === product.id) {
                return true;
            }
        });
        cart[itemIndex].quantity += quantity;
    } else {
        cart.push({...product, quantity});
    }
}

function removeFromCart(product) {
    const productId = product.id;
    const filteredProducts = cart.filter(
        (currentProduct) => product.id !== productId 
    );
    cart = filteredProducts;
}

function getCartTotalCost() {
    const totalCostOfCart = cart.reduce((cartTotal, currentProduct) => {
        cartTotal += currentProduct.price;
        return cartTotal;
    }, 0);
    return totalCostOfCart;
}

function checkoutCart(){
    const totalCost = getCartTotalCost();
    
    alert(`Your total cost is ${totalCost}. Thank you for shopping with us!`);
    clearCart();
}

console.log(cart);
addToCart(2);//legger til produktet med id 2 til kassen
//removeFromCart(2);//fjerner  produktet med id 2 fra kassen
