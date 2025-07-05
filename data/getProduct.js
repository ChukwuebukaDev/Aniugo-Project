import products from "./products.js";

function getProduct(productId){
    let matchingProduct;

    products.forEach(product => {
        if(product.id === productId){
            matchingProduct = product;
        }
    });
  return matchingProduct;
}
export default getProduct;