import React, { useState, useEffect } from 'react';
// MUI
import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { FILTER_BY_SEARCH, selectFilteredProducts } from '../../../redux/features/filterSlice';
import ProductItem from '../ProductItem/ProductItem';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.85),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.85),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon    
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const ProductList = ({ products }) => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({products, search}))
  }, [dispatch, products, search]);

  return (
    <Box>
    <Box mt={3}>
    <Search>
        <SearchIconWrapper>
          <SearchIcon sx={{ color: 'white'}}/>
        </SearchIconWrapper>
        <StyledInputBase 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            color: 'white',
          }}
          placeholder="Search…"
        />
      </Search>
    </Box>
    
    <Box display='flex' flexWrap='wrap' justifyContent='center' mt={3} mb={3}>
    {filteredProducts.map((product) => (
      <Box key={product.id}>
        <ProductItem {...product} product={product}/>
      </Box>
    ))}
    </Box>
    </Box>
  )
}

export default ProductList;

