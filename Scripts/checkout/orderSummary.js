import { cart , removeFromCart , updateCartQuanity , updateQuantity , updateDeliveryOptions } from '../data/cart.js';
import getProduct from '../data/getProduct.js';
import { renderPaymentSummary } from './paymentSummary.js';
import  formatCurrency  from '../utils/moneyFormating.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from '../data/deliveryOptions.js';
export function renderOrderSummary(){
  console.log(cart);
  
let checkout_rendering = '';
cart.forEach((item) => {
const productId = item.productId;
const matchedProduct = getProduct(productId)
const deliveryOptionId = item.deliveryOptionId;
const deliveryOption = getDeliveryOption(deliveryOptionId);
const today = dayjs();
const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
const dateString = deliveryDate.format('dddd, MMMM D');
checkout_rendering += `
<div class="cart-item-container-${matchedProduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
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
              ${deliveryOptionsHtml(matchedProduct.id,item)}
              </div>
            </div>
          </div>
`;
});
function deliveryOptionsHtml(matched,cartItem){
  let html = '';
  deliveryOptions.forEach((options) => {
    
  const today = dayjs();
  const deliveryDate = today.add(options.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');
  const priceString = options.priceCents === 0 ? "FREE" : `₦${formatCurrency(options.priceCents)} - `;
  const isChecked = options.id === cartItem.deliveryOptionId;
    html += `
       
          <div class="delivery-option  deliveryUpdate"
                data-delivery-option-id = ${options.id}
                data-product-id = ${matched}
                >
            <input type="radio" ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matched}">
            <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} shipping
            </div> 
        </div>
    </div>
    `
  });
  return html;
}

function renderCheckoutPage(){
  document.querySelector('.order-summary').innerHTML = checkout_rendering;
document.querySelectorAll('.delete-quantity-link').forEach((link) => {
    link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        removeFromCart(productId);
        const productContainer = document.querySelector(`.cart-item-container-${productId}`);
        productContainer.remove();
        displayItemValue();
        renderPaymentSummary();
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
     displayItemValue();
     renderPaymentSummary();
     renderOrderSummary();
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
  displayItemValue()
  updateCheckoutItems()
  saveUpdatedItems();
document.querySelectorAll('.deliveryUpdate').forEach(options => {
  options.addEventListener('click' , ()=>{
    const { productId , deliveryOptionId } = options.dataset;
    updateDeliveryOptions(productId,deliveryOptionId)
    renderOrderSummary();
    renderPaymentSummary();
  });
});
}
renderOrderSummary()