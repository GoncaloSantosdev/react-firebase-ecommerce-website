import React, { useState, useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectMaxPrice, selectMinPrice, selectProducts } from '../../../redux/features/productSlice';
import { FILTER_BY_CATEGORY, FILTER_BY_PRICE } from '../../../redux/features/filterSlice';
// MUI
import { Box, Button, Typography } from '@mui/material';

const ProductFilter = () => {
  const [category, setCategory] = useState('All');
  const products = useSelector(selectProducts);
  const [price, setPrice] = useState(500);  
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const dispatch = useDispatch();

  const allCategories = [
    "All",
    ...new Set(products.map((product) => product.category))
  ];

  const filterProducts = (cat) => {
    setCategory(cat);
    dispatch(FILTER_BY_CATEGORY({products, category: cat}));
  };

  const clearFilters = () => {
    setCategory('All');
    setPrice(maxPrice);
  };

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  return (
    <>
      <Box mt={3} mb={3}>
        <Typography textAlign='center'>
          Categories
        </Typography>
        <Box mt={2}>
          {allCategories.map((cat, index) => (
            <Box key={index}>
              <Button 
                type='button' 
                variant={`${category}` === cat ? 'contained' : ''}
                onClick={() => filterProducts(cat)}
                >
                  {cat}
                </Button>
            </Box>
          ))}
        </Box>
      </Box>

      <Box mt={5} mb={3}>
          <Typography>Price</Typography>
          <Typography>{`$${price}`}</Typography>
          <input
            type="range"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={minPrice}
            max={maxPrice}
          />      
          </Box>

      <Box mt={5} mb={3}>
        <Button variant='contained' onClick={clearFilters}>Clear Filters</Button>
      </Box>
    </>
  )
}

export default ProductFilter