import React, { useState, useEffect } from 'react';
// React Router
import { useParams } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from '../../../redux/features/cartSlice';
import { selectIsLoggedIn } from '../../../redux/features/authSlice';
// Firebase
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
// MUI
import { Box, Button, Typography, Container } from '@mui/material';
// Toast
import { toast } from 'react-toastify';
// Disqus
import DisqusThread from '../../Disquis';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch();

  const getProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const obj = {
          id: id,
          ...docSnap.data(),
        }
        setProduct(obj);
      } else {
        toast.error('Product not found');
      } 
  }

  useEffect(() => {
    getProduct();
  }, []);

  const addToCart = (product) => {
    if(isLoggedIn){
      dispatch(ADD_TO_CART(product));
      dispatch(CALCULATE_TOTAL_QUANTITY());
    } else {
      toast.error('Create an account');
    }
  }

  return (
    <Container>
    <Box display='flex' alignItems='center' justifyContent='center' mt={5}>
      <Box width='50%'>
        <img src={product.imageURL} alt={product.title} style={{ width: '100%', height: '70vh', objectFit: 'cover', borderRadius: '5px'}}/>
      </Box>
      <Box ml={4} width='50%'>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h6'>
            {product.title} 
          </Typography>

          <Typography>
            <span style={{ fontWeight: 'bold' }}>Price:</span> ${product.price}
          </Typography>
        </Box>

        <Box>
          <Typography mt={3}>
              {product.description}
          </Typography>
        </Box>

        <Box>
          <Typography mt={3}>
            <span style={{ fontWeight: 'bold' }}>Category:</span> {product.category}
          </Typography>
        </Box>

        <Box mt={3}>
          <Button variant='contained' onClick={() => addToCart(product)}>Add To Cart</Button>
        </Box>
      </Box>
    </Box>
    <Box mt={12}>
      <DisqusThread id={id} title={product.title} path={`/product-details/${id}`}/>
    </Box>
    </Container>
  )
}

export default ProductDetails