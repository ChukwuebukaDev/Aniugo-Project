export let cart = [{
    productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:2
},
{
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:1
}];
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
}
export const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.productId != productId );
    cart = newCart;

}
export const updateCartQuanity = () => {
    let cartQuantity = 0;
    cart.forEach((item) => {
    cartQuantity += item.quantity;
    })
    document.querySelector('.cart-quantity').textContent = cartQuantity;
}