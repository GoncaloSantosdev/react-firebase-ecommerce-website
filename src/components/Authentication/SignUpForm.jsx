import React, { useState } from 'react';
// React Router
import { Link, useNavigate } from 'react-router-dom';
// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/config';
// MUI
import { Box, Button, Grid, Paper, TextField, Typography} from '@mui/material';
// React Toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(password !== confirmPassword){
      toast.error('Passwords do not match');
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        toast.success('Welcome!');
        navigate('/');
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
    });
  }

  return (
    <>
    <Grid container component="main" display='flex' alignItems='center' justifyContent='center' height='92vh'>
    <Grid item component={Paper}>
      <Box p={5} textAlign='center'>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form noValidate style={{ marginTop: '2rem'}} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassowrd(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Box mt={3} mb={3}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign Up
            </Button>
          </Box>

          <Grid container>
            <Grid item>
              <Link to="/signin" variant="body2">
                Already have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Grid>
  </Grid>
  </>
  )
}

export default SignUpForm