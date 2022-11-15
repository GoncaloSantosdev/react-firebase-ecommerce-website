import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filteredProducts: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
      const { products, search } = action.payload;
      const tempProducts = products.filter((product) => product.title?.toLowerCase().includes(search?.toLowerCase()));

      state.filteredProducts = tempProducts;
    },
    FILTER_BY_CATEGORY(state, action){
      const { products, category } = action.payload;
      let tempProducts = [];

      if(category === 'All'){
        tempProducts = products
      } else {
        tempProducts = products.filter((product) => product.category === category);
      }
      state.filteredProducts = tempProducts;
    },
    FILTER_BY_PRICE(state, action){
      const { products, price } = action.payload;
      let tempProducts = [];
      tempProducts = products.filter((product) => product.price <= price);

      state.filteredProducts = tempProducts;
    }
  }
});

export const { FILTER_BY_SEARCH, FILTER_BY_CATEGORY, FILTER_BY_PRICE } = filterSlice.actions;

export const selectFilteredProducts = (state) => state.filter.filteredProducts; 

export default filterSlice.reducer