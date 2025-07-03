import {cart,removeFromCart,updateCartQuanity,updateQuantity} from '../../data/cart.js';
import products from '../../data/products.js';
import  formatCurrency  from '../utils/moneyFormating.js';

let checkout_rendering = '';
cart.forEach((item) => {
const productId = item.productId;
let matchedProduct;
products.forEach((product) => {
    if(product.id === productId){
        matchedProduct = product;
    }
});
checkout_rendering += `
<div class="cart-item-container-${matchedProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchedProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                    ${matchedProduct.name}
                </div>
                <div class="product-price">
                  ₦${formatCurrency(matchedProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label quantity-${matchedProduct.id}">${item.quantity}</span>
                  </span>
                  <span data-product-id = "${matchedProduct.id}" class="update-quantity-link link-primary updateItems">
                    Update
                  </span>
                  <input data-product-id = "${matchedProduct.id}" type="number" min="1" max="20" class="updateField update-quantity-${matchedProduct.id}" id="updated" />
                  <span data-product-id = "${matchedProduct.id}" class="saveUpdate  link-primary" id="saved">
                  Save</span>
                  <span class="delete-quantity-link link-primary" data-product-id = "${matchedProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchedProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchedProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchedProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
`;

});
function renderCheckoutPage(){
  document.querySelector('.order-summary').innerHTML = checkout_rendering;
document.querySelectorAll('.delete-quantity-link').forEach((link) => {
    link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        removeFromCart(productId);
        const productContainer = document.querySelector(`.cart-item-container-${productId}`);
        productContainer.remove();
        displayItemValue()
    })
});
}
function displayItemValue(){
updateCartQuanity(document.querySelector('.return-to-home-link'));
}
function updateCheckoutItems(){
    document.querySelectorAll('.updateItems').forEach(btn => {
  btn.addEventListener('click', () => {
    const productId = btn.dataset.productId;
     const productContainer = document.querySelector(`.cart-item-container-${productId}`);
     productContainer.classList.add('is-editing-quantity');
  });
  });
  }
function saveUpdatedItems(){
 document.querySelectorAll('#saved').forEach((link) => {
    link.addEventListener('click',()=>{
      const productId = link.dataset.productId;
     const productContainer = document.querySelector(`.cart-item-container-${productId}`);
     productContainer.classList.remove('is-editing-quantity');
     const updateInput = document.querySelector(`.update-quantity-${productId}`);
     const newUpdate = document.querySelector(`.quantity-${productId}`);
 
   
     newUpdate.textContent = +updateInput.value;
     updateQuantity(productId,+updateInput.value);
     displayItemValue()
    }); 
  });
  document.querySelectorAll('.updateField').forEach(updateInput => {
  updateInput.addEventListener('keydown',(e)=>{
    const productId = updateInput.dataset.productId;
    if(e.key === 'Enter'){
     const productContainer = document.querySelector(`.cart-item-container-${productId}`);
     productContainer.classList.remove('is-editing-quantity');
     const updateInput = document.querySelector(`.update-quantity-${productId}`);
     const newUpdate = document.querySelector(`.quantity-${productId}`);
     newUpdate.textContent = +updateInput.value;
     updateQuantity(productId,+updateInput.value);
     displayItemValue()
     updateInput.value = '';
}});
})
  }
renderCheckoutPage();
displayItemValue();
updateCheckoutItems();
saveUpdatedItems();