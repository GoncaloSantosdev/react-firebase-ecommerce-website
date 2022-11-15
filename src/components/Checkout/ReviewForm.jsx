import React from 'react';
// Redux
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalAmount } from '../../redux/features/cartSlice';
import { selectShippingAddress } from '../../redux/features/checkoutSlice';
// MUI
import { Button, Divider, Grid, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ReviewForm = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmout = useSelector(selectCartTotalAmount);
  const shippingAddress = useSelector(selectShippingAddress);

  return (
    <Paper sx={{ marginTop: '4rem', padding: '2rem' }}>
    <Typography variant="h5" gutterBottom>
      Order summary
    </Typography>
    <List disablePadding>
      <Typography variant='h6' mt={3}>
        Products
      </Typography>
      {cartItems.map((item) => (
        <ListItem key={item.title} sx={{ py: 1, px: 0 }}>
          <ListItemText primary={item.title} />
          <Typography variant="body2">${item.price.toFixed(2)}</Typography>
        </ListItem>
      ))}
      <Divider />
      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText primary="Total"/>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          ${cartTotalAmout.toFixed(2)}
        </Typography>
      </ListItem>
    </List>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Shipping Details
        </Typography>
        <Typography gutterBottom>Name: {shippingAddress.name}</Typography>
        <Typography gutterBottom>Phone Number: {shippingAddress.phone}</Typography>
        <Typography gutterBottom>Country: {shippingAddress.country}</Typography>
        <Typography gutterBottom>Address: {shippingAddress.line1} {shippingAddress.postal_code}</Typography>
      </Grid>
      <Grid item xs={12} display='flex' justifyContent='space-between' alignItems='center'>
        <Link to='/checkout/payment'>
            <Button variant='contained'>Finalize Payment</Button>
        </Link>
      </Grid>
    </Grid>
  </Paper>
  )
}

export default ReviewForm