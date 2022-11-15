import { combineReducers, configureStore } from "@reduxjs/toolkit";
// Reducers
import authReducer from './features/authSlice';
import productReducer from './features/productSlice';
import filterReducer from './features/filterSlice';
import cartReducer from './features/cartSlice';
import checkoutReducer from './features/checkoutSlice';
import orderReducer from './features/orderSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  });
  

export default store;