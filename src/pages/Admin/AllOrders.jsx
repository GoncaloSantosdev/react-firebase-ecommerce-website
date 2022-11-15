import React, { useEffect } from 'react';
// Firebase
import useFetchCollection from '../../customHooks/useFetchCollection';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../redux/features/authSlice';
import { selectOrderHistory, STORE_ORDERS } from '../../redux/features/orderSlice';
// MUI
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const AllOrders = () => {
  const { data } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  return (
    <Container>
    <Box mt={12}>
    <Typography mb={3} variant='h6'>
      Open an order to change order status
    </Typography>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>s/n</TableCell>
          <TableCell align="right">Date</TableCell>
          <TableCell align="right">Order ID</TableCell>
          <TableCell align="right">Order Amount</TableCell>
          <TableCell align="right">Order Status</TableCell>
          <TableCell align="right">View Order</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((order, index) => (
          <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {index + 1}
            </TableCell>
            <TableCell align="right">{order.orderDate}</TableCell>
            <TableCell align="right">{order.id}</TableCell>
            <TableCell align="right">${order.orderAmount}</TableCell>
            <TableCell align="right">{order.orderStatus}</TableCell>
            <TableCell align="right">
              <Link to={`/order-details/${order.id}`}>
                <Button variant='contained'>
                  View Order
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </Box>
  </Container>
  )
}

export default AllOrders