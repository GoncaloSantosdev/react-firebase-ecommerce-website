import React, { useEffect } from 'react';
// React Router
import { Link } from 'react-router-dom';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalQuantity, selectCartTotalAmount, ADD_TO_CART, DECREASE_CART, REMOVE_FROM_CART, CLEAR_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY } from '../redux/features/cartSlice';
// MUI
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const dispatch = useDispatch();

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  return (
    <Container>
    <Box mt={12}>
    <TableContainer component={Paper} >
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Image</TableCell>
          <TableCell>Product</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Quantity</TableCell>
          <TableCell align="right">Total</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {cartItems.map((cart) => {
            const { id, title, price, imageURL, cartQuantity } = cart;
            return (
                <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row"><img src={imageURL} alt={title}  style={{ width: '150px', height: '130px', objectFit: 'cover'}}/></TableCell>
                <TableCell component="th" scope="row">{title}</TableCell>
                <TableCell align="right">${price}</TableCell>
                <TableCell align="right">
                    <Box>
                        <Button onClick={() => decreaseCart(cart)}>-</Button>
                        {cartQuantity}
                        <Button onClick={() => increaseCart(cart)}>+</Button>
                    </Box>
                </TableCell>
                <TableCell align="right">${price * cartQuantity}</TableCell>
                <TableCell align="right"><DeleteIcon sx={{ cursor: 'pointer', color: 'red' }} onClick={() => removeFromCart(cart)}/></TableCell>
              </TableRow>
            )
            })}
      </TableBody>
    </Table>
  </TableContainer>
  </Box>
  <Box mt={3} display='flex' alignItems='center' justifyContent='space-between'>
    <Box>
        <Button variant='contained' onClick={clearCart}>Clear Cart</Button>
        <Link to='/' variant="body2">
            <Button sx={{ marginLeft: '10px' }}>Continue Shopping</Button>
        </Link>
    </Box>
    <Box>
        <Paper sx={{ padding: '20px', width: '300px' }}>
            <Box>
                <Typography>
                    {`Cart Item(s): ${cartTotalQuantity}`}
                </Typography>
            </Box>
            <Box mt={3}>
                <Typography>
                    Subtotal: {`$${cartTotalAmount.toFixed(2)}`}
                </Typography>
            </Box>
            <Box mt={3}>
                <Link to='/checkout/address'>
                    <Button variant='contained' fullWidth>Checkout</Button>
                </Link>
            </Box>
        </Paper>
    </Box>
  </Box>
  </Container>
  )
}

export default Cart