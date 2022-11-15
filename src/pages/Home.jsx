import React, { useEffect } from 'react';
// Hooks
import useFetchCollection from '../customHooks/useFetchCollection';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, STORE_PRODUCTS, GET_PRICE_RANGE } from '../redux/features/productSlice';
// Components
import { ProductFilter, ProductList } from '../components';
// MUI
import { Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useFetchCollection('products');
  const products = useSelector(selectProducts);

  useEffect(() => {
      dispatch(STORE_PRODUCTS({
        products: data,
      }));

      dispatch(GET_PRICE_RANGE({
        products: data,
      }));
  }, [dispatch, data]);

  return (
    <Box sx={{ margin: '0rem 2rem' }}>
      <Box sx={{ flexGrow: 1, marginTop: '3rem' }}>
        <Grid container>
          <Grid xs>
            <Item><ProductFilter products={products}/></Item>
          </Grid>
          <Grid xs>
            <Item><ProductList products={products}/></Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default Home