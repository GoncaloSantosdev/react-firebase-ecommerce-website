import React from 'react';
// React Router
import { Link } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART } from '../../../redux/features/cartSlice';
import { selectIsLoggedIn } from '../../../redux/features/authSlice';
// MUI
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { toast } from 'react-toastify';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const addToCart = (product) => {
    if(isLoggedIn){
      dispatch(ADD_TO_CART(product));
    } else {
      toast.error('Create an account');
    }
  }

  return (
    <Card sx={{ minWidth: 250, margin: '10px'}}>
    <Link to={`/product-details/${product.id}`}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="150"
        image={product.imageURL}
        alt={product.title}
      />
      <CardContent sx={{ textAlign: 'left' }}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography gutterBottom variant="h6" component="div" color='black'>
            {product.title}
          </Typography>
          <Typography gutterBottom component="div" color='black' sx={{ fontSize: '1rem' }}>
            ${product.price}
          </Typography>
        </Box>

      </CardContent>
    </CardActionArea>
    </Link>
    <CardActions>
      <Button size="small" color="primary" variant='contained' sx={{ marginBottom: '10px'}} onClick={() => addToCart(product)}>
        Add To Cart
      </Button>
    </CardActions>
  </Card>
  )
}

export default ProductItem