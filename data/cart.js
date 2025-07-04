export let cart = JSON.parse(localStorage.getItem('cart')) ?? [];

export const saveToStorage = () => {
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
            quantity:+selectQuantity.value,
            deliveryOptionId:'1'
        });
    };
    saveToStorage();
}
export function updateQuantity(productId,newQuantity){
    let matchingItem;
    cart.forEach(item =>{
        if(item.productId === productId){
            matchingItem = item;
        }
    });
   
    matchingItem.quantity = newQuantity;
    saveToStorage()
}
export const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.productId != productId );
    cart = newCart;
   saveToStorage()
}

export const updateCartQuanity = (view) => {
    let cartQuantity = 0;
    cart.forEach((item) => {
    cartQuantity += item.quantity;
    })
    view.textContent = cartQuantity || 'Empty';
}
export function updateDeliveryOptions (productId,deliveryOptionId){
    let matchingItem;
        cart.forEach((item) => {
            if(productId === item.productId){
                matchingItem = item;
            }
        });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage()
}