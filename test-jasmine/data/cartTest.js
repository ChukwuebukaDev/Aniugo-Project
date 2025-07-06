import { addToCart , cart, loadFromStorage } from "../../Scripts/data/cart.js";

describe('Test suite: addToCart', () => {
    it('adds a new product to the cart', () =>{
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage()
        addToCart('b0f17cc5-8b40-4ca5-9142-b61fe3d98c85');
        expect(cart.length).toEqual(1);
    });
});
addToCart('b0f17cc5-8b40-4ca5-9142-b61fe3d98c85');
console.log(cart);
