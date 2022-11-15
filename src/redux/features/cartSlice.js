import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    previousURL: '',
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    ADD_TO_CART(state, action){
      const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      
        if(productIndex >= 0) {
          // Item already exists in the cart 
          // Increase the cart quantity
          state.cartItems[productIndex].cartQuantity += 1;
          toast.success(`${action.payload.title} added to cart`)
        } else { 
          // Item doesn't exist in the cart
          // Add item to the cart
          const tempProduct = {...action.payload, cartQuantity: 1}
          state.cartItems.push(tempProduct);
          toast.success(`${action.payload.title} added to cart`)
        }

        // Save cart to localstorage
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    DECREASE_CART(state, action){
      const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

      if(state.cartItems[productIndex].cartQuantity > 1){
        state.cartItems[productIndex].cartQuantity -= 1;
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id);
        state.cartItems = newCartItem;
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    REMOVE_FROM_CART(state, action){
      const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id);
      state.cartItems = newCartItem;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      toast.success(`${action.payload.title} was removed from cart`);
    },
    CLEAR_CART(state, action){
      state.cartItems = [];
    },
    CALCULATE_SUBTOTAL(state, action){
      const array = [];
      state.cartItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      })
      const totalAmount = array.reduce((a, b) => {
        return a + b
      }, 0);

      state.cartTotalAmount = totalAmount;
    },
    CALCULATE_TOTAL_QUANTITY(state, action){
      const array = [];
      state.cartItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;
        return array.push(quantity);
      })
      const totalQuantity = array.reduce((a, b) => {
        return a + b
      }, 0);

      state.cartTotalQuantity = totalQuantity;
    },
    SAVE_URL(state, action) {
      console.log(action.payload);
      state.previousURL = action.payload;
    },
  }
});

export const { ADD_TO_CART, DECREASE_CART, REMOVE_FROM_CART, CLEAR_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity= (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousURL = (state) => state.cart.previousURL;

export default cartSlice.reducer