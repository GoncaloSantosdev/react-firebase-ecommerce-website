import React from 'react';
// React Router
import { Link } from 'react-router-dom';
// MUI
import { Button, Container, Paper, Typography } from '@mui/material';

const CheckoutSuccess = () => {
  return (
    <Container>
      <Paper sx={{ marginTop: '3rem', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h5'>
          Payment completed with success!
        </Typography>
        <Link to='/orders' style={{ marginTop: '2rem' }}>
          <Button variant='contained'>View All Orders</Button>
        </Link>
      </Paper>
    </Container>
  )
}

export default CheckoutSuccess