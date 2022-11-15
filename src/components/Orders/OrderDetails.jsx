import React, { useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { STORE_ORDERS, selectOrderHistory } from '../../redux/features/orderSlice';
import { selectUserId } from '../../redux/features/authSlice'; 
// Firebase
import useFetchCollection from '../../customHooks/useFetchCollection';
// MUI
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const OrderDetails = () => {
  const { data } = useFetchCollection("orders");
  const orders = useSelector(selectOrderHistory);
  const userID = useSelector(selectUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(STORE_ORDERS(data));
  }, [dispatch, data]);

  const filteredOrders = orders.filter((order) => order.userID === userID);

  return (
    <Box mt={12}>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>s/n</TableCell>
          <TableCell align="right">Date</TableCell>
          <TableCell align="right">Order ID</TableCell>
          <TableCell align="right">Order Amount</TableCell>
          <TableCell align="right">Order Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredOrders.map((order, index) => (
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </Box>
  )
}

export default OrderDetails