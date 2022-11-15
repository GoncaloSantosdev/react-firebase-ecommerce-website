import React, { useState } from 'react';
// React Router
import { useNavigate } from 'react-router-dom';
// Firebase
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
// MUI
import { Box, Button } from '@mui/material';
// Toast
import { toast } from 'react-toastify';


const AdminOrderStatus = ({order, id}) => {
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const editOrder = (e, id) => {
    e.preventDefault();

    const orderConfig = {
      userID: order.userID,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: order.cartItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate()
    };

    try {
      setDoc(doc(db, "orders", id), orderConfig);
      toast.success("Order status changed successfully");
      navigate('/allOrders');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box mt={3}>
      <form onSubmit={(e) => editOrder(e, id)}>
          <select
            labelId="demo-select-small"
            id="demo-select-small"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{
              width: '200px',
              padding: '10px',
              borderRadius: '5px'
            }}
          >
          <option value='' disabled>Choose One</option>
          <option value='Order Placed'>Order Placed</option>
          <option value='Delivered'>Delivered</option>
        </select>
        <Box mt={2}>
          <Button type='submit' variant='contained'>
            Update Status
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default AdminOrderStatus