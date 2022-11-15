import React, { useState } from 'react';
// React Router
import { Link, useNavigate } from 'react-router-dom';
// Dispatch
import { useDispatch } from 'react-redux';
import { SAVE_SHIPPING_ADDRESS } from '../../redux/features/checkoutSlice';
// MUI
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';

const initalAddressState = {
  name: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  postal_code: '',
  country: '', 
}

const AddressForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shippingAddress, setShippingAddress] = useState({...initalAddressState});

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    navigate('/checkout/review');
  }

  return (
    <Paper sx={{ marginTop: '4rem', padding: '2rem' }}>
    <Typography variant="h6" gutterBottom textAlign='center'>
      Shipping address
    </Typography>
    <form onSubmit={handleSubmit}>
    <Grid container spacing={3} mt={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="name"
          name="name"
          label="Name"
          fullWidth
          autoComplete="given-name"
          variant="standard"
          value={shippingAddress.name}
          onChange={(e) => handleShipping(e)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
         required
         id="phone"
         name="phone"
         label="Phone Number"
         fullWidth
         autoComplete="phone number"
         variant="standard"
         value={shippingAddress.phone}
         onChange={(e) => handleShipping(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="line1"
          name="line1"
          label="Address line 1"
          fullWidth
          autoComplete="shipping address-line1"
          variant="standard"
          value={shippingAddress.line1}
          onChange={(e) => handleShipping(e)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="line2"
          name="line2"
          label="Address line 2"
          fullWidth
          autoComplete="shipping address-line2"
          variant="standard"
          value={shippingAddress.line2}
          onChange={(e) => handleShipping(e)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="city"
          name="city"
          label="City"
          fullWidth
          autoComplete="shipping address-level2"
          variant="standard"
          value={shippingAddress.city}
          onChange={(e) => handleShipping(e)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="state"
          name="state"
          label="State/Province/Region"
          fullWidth
          variant="standard"
          value={shippingAddress.state}
          onChange={(e) => handleShipping(e)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="zip"
          name="postal_code"
          label="Zip / Postal code"
          fullWidth
          autoComplete="shipping postal-code"
          variant="standard"
          value={shippingAddress.postal_code}
          onChange={(e) => handleShipping(e)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="country"
          name="country"
          label="Country"
          fullWidth
          autoComplete="shipping country"
          variant="standard"
          value={shippingAddress.country}
          onChange={(e) => handleShipping(e)}
        />
      </Grid>
      <Grid item xs={12} display='flex' justifyContent='space-between' alignItems='center'>
        <Link to='/cart'>
            <Button variant='contained'>Go Back</Button>
        </Link>
        <Button type='submit' variant='contained'>Proceed</Button>
      </Grid>
    </Grid>
    </form>
  </Paper>
  )
}

export default AddressForm