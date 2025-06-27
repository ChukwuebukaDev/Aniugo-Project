export let cart = JSON.parse(localStorage.getItem('cart')) ?? [];

const saveToStorage = () => {
localStorage.setItem('cart',JSON.stringify(cart));
}
export const addToCart = (productId,selectQuantity) => {
let matchingItem;
        cart.forEach((item) => {
            if(productId === item.productId){
                matchingItem = item;
            }
        });
        if(matchingItem){
        matchingItem.quantity += +selectQuantity.value
        ;
        }
        else{
        cart.push({
            productId,
            quantity:+selectQuantity.value
        });
    };
    saveToStorage();
}
export const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.productId != productId );
    cart = newCart;
   saveToStorage()
}
export const updateCartQuanity = () => {
    let cartQuantity = 0;
    cart.forEach((item) => {
    cartQuantity += item.quantity;
    })
    document.querySelector('.cart-quantity').textContent = cartQuantity;
}