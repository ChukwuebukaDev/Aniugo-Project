import products from '../data/products.js';
import cart from '../data/cart.js';
let productRendering = '';
products.forEach((product) => {
    productRendering += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src=${product.image}>
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ₦${product.priceCents}
          </div>

          <div class="product-quantity-container">
            <select class="select-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart added-logo-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary add-btn" data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>
    `;
});
document.querySelector('.product-inject').innerHTML = productRendering;
document.querySelectorAll('.add-btn').forEach((button)=>{
    button.addEventListener('click',(e)=>{
        const productId = e.target.dataset.productId;
        const selectQuantity = document.querySelector(`.select-quantity-${productId}`);
        const addedLogo = document.querySelector(`.added-logo-${productId}`);
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

        const timer_for_logo = () => {
        addedLogo.classList.add('addedLogo');
        let logoTimer = setTimeout(()=>{
            addedLogo.classList.remove('addedLogo');
        },2000);

        return () => logoTimer;
        };
   
     clearTimeout(timer_for_logo());

        let cartQuantity = 0;
        cart.forEach((item)=>{
            cartQuantity += item.quantity;
        })
        document.querySelector('.cart-quantity').textContent = cartQuantity;
    })
})

