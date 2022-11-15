import React, { useEffect, useState } from 'react';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotalAmount, CALCULATE_TOTAL_QUANTITY, CALCULATE_SUBTOTAL } from '../../redux/features/cartSlice';
import { selectEmail } from '../../redux/features/authSlice';
import { selectShippingAddress } from '../../redux/features/checkoutSlice';
// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
// Components
import PaymentForm from '../../components/Checkout/PaymentForm';
// MUI
import { Container } from '@mui/material';
// Toast
import { toast } from 'react-toastify';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('Initializing Checkout');
  const [clientSecret, setClientSecret] = useState('');

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const customerEmail = useSelector(selectEmail);
  const shippingAddress = useSelector(selectShippingAddress);

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems])

  const description = `eShop payment: email: ${customerEmail}, amout: ${totalAmount}`

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://react-firebase-ecommerce-app.herokuapp.com/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        items: cartItems,
        user: customerEmail,
        shipping: shippingAddress,
        description
      }),
    })
      .then((res) => {
        if(res.ok){
          return res.json();
        } else {
          return res.json().then((json) => Promise.reject(json));
        }
      })
      .then((data) =>{
        setClientSecret(data.clientSecret)
      })
      .catch((error) => {
        setMessage('Failed to initialize checkout');
        toast.error('Something went wrong');
      })
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };


  return (
    <Container>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      )}
    </Container>    
  )
}

export default Payment