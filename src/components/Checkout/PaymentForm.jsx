import React, { useEffect, useState } from 'react';
// React Router
import { useNavigate } from 'react-router-dom';
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUserId, selectEmail } from '../../redux/features/authSlice';
import { selectCartItems, selectCartTotalAmount, CLEAR_CART } from '../../redux/features/cartSlice';
import { selectShippingAddress } from '../../redux/features/checkoutSlice';
// Stripe
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
// Firebase
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
// MUI
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
// Toast
import { toast } from 'react-toastify';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userID = useSelector(selectUserId);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const shippingAddress = useSelector(selectShippingAddress);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

    if (!clientSecret) {
      return;
    }      
  }, [stripe]);

  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: cartTotalAmount,
      orderStatus: 'Order placed',
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate()
    };

    try {
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(CLEAR_CART());
      navigate("/checkout-success");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/checkout-success",
        },
        redirect: "if_required",
      })
      .then((result) => {
        // ok - paymentIntent // bad - error
        if (result.error) {
          toast.error(result.error.message);
          setMessage(result.error.message);
          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment successful");
            saveOrder();
          }
        }
      });

    setIsLoading(false);
  };

  return (
    <Paper sx={{ marginTop: '4rem', padding: '2rem' }}>
        <Typography variant="h6" gutterBottom textAlign='center'>
          Finalize Payment
        </Typography>
        <Typography>
          4242 4242 4242 4242 (Card Number)
        </Typography>
        <Typography>
          04/24 (Expiration Date)
        </Typography>        
      <form id="payment-form" onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
        <PaymentElement id="payment-element" />
        <Box mt={3}>
          <Button type='submit' variant='contained' disabled={isLoading || !stripe || !elements} id="submit">
            <span id="button-text">
              {isLoading ? 'Processing Payment...' : "Pay now"}
            </span>
          </Button>
        </Box>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </Paper>
  )
}

export default PaymentForm