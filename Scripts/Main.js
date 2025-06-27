const products = [{
    name: "2022 Mercedes Benz mobile actuator",
    image:"./assets/abs3.jpg",
    priceCents:860222,
    rating: {
        stars:4.5,
        count: 87
    }
},{
    name: "Size 15 70s Master Brake pump actuator",
    image:"./assets/abs5.jpg",
    priceCents:750000,
    rating: {
        stars:4,
        count: 127
    }
},{
    name: "Toyota Land Cruiser Abs",
    image:"./assets/abs4.webp",
    priceCents:567493,
    rating: {
        stars:4.5,
        count: 56
    }
}];

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
            <select>
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

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>
    `;
});
document.querySelector('.product-inject').innerHTML = productRendering;
