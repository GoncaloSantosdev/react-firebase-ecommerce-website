import React, { useState } from 'react';
// Redux
import { selectPreviousURL } from "../../redux/features/cartSlice";
import { useSelector } from "react-redux";
// React Router
import { Link, useNavigate } from 'react-router-dom';
// Firebase
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../firebase/config';
// MUI
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
// React Toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const previousURL = useSelector(selectPreviousURL);
  const navigate = useNavigate();

  const redirectUser = () => {
    if (previousURL.includes("cart")) {
      return navigate("/cart");
    }
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      toast.success('Welcome!');
      redirectUser();
    })
    .catch((error) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    });
  }

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      toast.success('Welcome!');
      redirectUser();
    }).catch((error) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    });
  }

  return (
    <>
    <Grid container component="main" display='flex' alignItems='center' justifyContent='center' height='92vh'>
    <Grid item  component={Paper}>
      <Box p={5} textAlign='center'>
        <Typography component="h1" variant="h5">
          Sign in
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
          <Box mt={3} mb={3}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Sign In
            </Button>
            <Button sx={{ marginTop: '1rem' }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={signInWithGoogle}
            >
              Log in with Google
            </Button>
          </Box>

          <Grid container>
            <Grid item>
              <Link to="/signup" variant="body2">
                Don't have an account? Sign Up
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

export default SignInForm