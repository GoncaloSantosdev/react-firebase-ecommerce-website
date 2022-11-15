import React, { useState, useEffect } from 'react';
// React Router 
import { Link, useParams } from "react-router-dom";
// Components
import AdminOrderStatus from './AdminOrderStatus';
// Firebase
import useFetchDocument from '../../customHooks/useFetchDocument';
// Material UI
import { Box, Button, Container, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

const AdminOrderDetails = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  return (
      <Container>
        <Box mt={8}>
          <Box display='flex' alignItems='center' justifyContent='space-between'>
            <Typography variant='h5'>Order Details</Typography>
            <Link to="/allOrders">
              <Button variant='contained'>
                Back To Orders
              </Button>
            </Link>
          </Box>
          {order === null ? (
            <Typography>Loading...</Typography>
          ) : (
            <Box mt={3}>
              <Box mb={1}>
                <Typography>
                  Order Id: {order.id}
                </Typography>
                <Typography>
                  Order Amount: ${order.orderAmount}
                </Typography>
                <Typography>
                  Order Status {order.orderStatus}
                </Typography>
              </Box>
              <Divider />
              <Box mt={1}>
                <Typography>
                  Address: {order.shippingAddress.line1}
                </Typography>
                <Typography>
                  {order.shippingAddress.city}
                </Typography>
                <Typography>
                  State: {order.shippingAddress.state}
                </Typography>
                <Typography>
                  Country: {order.shippingAddress.country}
                </Typography>
              </Box>
              <br />
              <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>s/n</TableCell>
                    <TableCell align="right">Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.cartItems.map((cart, index) => {
                    const { id, name, price, imageURL, cartQuantity } = cart;
                    return (
                      <TableRow key={id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{index + 1}</TableCell>
                        <TableCell align="right">
                          <img
                            src={imageURL}
                            alt={name}
                            style={{ width: "100px" }}
                          />
                        </TableCell>
                        <TableCell align="right">{price}</TableCell>
                        <TableCell align="right">{cartQuantity}</TableCell>
                        <TableCell align="right">{(price * cartQuantity).toFixed(2)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              </TableContainer>
            </Box>
          )}
          <AdminOrderStatus order={order} id={id} />
        </Box>
      </Container>
    );
}

export default AdminOrderDetails