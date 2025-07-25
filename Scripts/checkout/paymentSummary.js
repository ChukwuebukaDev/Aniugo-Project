import { cart } from "../data/cart.js";
import formatCurrency from "../utils/moneyFormating.js";
import getProduct from "../data/getProduct.js";
import { getDeliveryOption } from "../data/deliveryOptions.js";
export function renderPaymentSummary(){
    let productPrice = 0;
    let shippingPrice = 0;
    let cartQuantity = 0;
    cart.forEach((item) => {
      const product =  getProduct(item.productId);
      productPrice += product.priceCents * item.quantity;
      cartQuantity += item.quantity;
      const deliveryOption = getDeliveryOption(item.deliveryOptionId)
      shippingPrice += deliveryOption.priceCents
    });
    const totalBeforeTax = productPrice + shippingPrice;
    const tax = totalBeforeTax * 0.1;
    const totalPrice = totalBeforeTax + tax;

    const paymentSummaryHtml = `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">₦${formatCurrency(productPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">₦${formatCurrency(shippingPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">₦${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">₦${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">₦${formatCurrency(totalPrice)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `
    document.querySelector('.payment-bar').innerHTML = paymentSummaryHtml;
}
