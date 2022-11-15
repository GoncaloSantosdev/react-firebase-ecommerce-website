import React, { useEffect, useState } from 'react';
// React Router
import { Link, useNavigate } from 'react-router-dom';
// Components
import AdminRoute from './Admin/AdminRoute';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER, selectIsLoggedIn } from '../redux/features/authSlice';
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity, selectCartItems, CLEAR_CART } from '../redux/features/cartSlice';
// Firebase
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/config';
// Material UI
import { AppBar, Avatar, Badge, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// React Toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/signin');
      dispatch(CLEAR_CART());
    }).catch((error) => {
      toast.error(error.message);
    })
  }

  // Monitor signed in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if(user.displayName === null){
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setUserName(uName);
        } else {
          setUserName(user.displayName);
          setUserImage(user.photoURL);
        }

        dispatch(SET_ACTIVE_USER({
          email: user.email,
          userName: user.displayName ? user.displayName : userName,
          userImage: user.photoURL ? user.photoURL : '/static/images/avatar/2.jpg',
          userID: user.uid,
        }));
      } else {
        setUserName('');
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, userName]);

  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Box display='flex' alignItems='center' flexGrow={1}>
        <StoreIcon sx={{ mr: 1 }} />
        {isLoggedIn && (
          <Link to='/'>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              fontWeight: 700,
              fontSize: {xs: '1rem', md: '1.3rem'},  
              color: 'white',
              textDecoration: 'none',
            }}
          >
            Ecommerce Website
          </Typography>
          </Link>
        )}

        </Box>
        {isLoggedIn ? (
        <Box sx={{ flexGrow: 0 }}>
        <Box display='flex' alignItems='center'> 
        <Link to='/cart'>
          <Badge badgeContent={cartTotalQuantity} color="error" sx={{ marginRight: '15px' }}>
              <ShoppingCartIcon sx={{ color: 'white' }}/>
          </Badge>
        </Link>           
          <Typography mr={2}>{userName}</Typography>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, }}>
              <Avatar alt='' src={userImage} />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Link to='/orders' className='links'>
                <Typography color='black'>Orders</Typography>
              </Link>
              <Link to='/cart' className='links'>
                <Typography color='black'>Cart</Typography>
              </Link>
              <Link to='/signin' className='links' onClick={handleLogout}>
                <Typography color='black'>Logout</Typography>
              </Link>
              <AdminRoute>
                <Link to='/addProduct/ADD' className='links'>
                  <Typography color='black'>Add Product</Typography>
                </Link>
                <Link to='/allProducts' className='links'>
                  <Typography color='black'>All Products</Typography>
                </Link>
                <Link to='/allOrders' className='links'>
                  <Typography color='black'>All Orders</Typography>
                </Link>
              </AdminRoute>
          </MenuItem>
        </Menu>
      </Box>
        ) : (
          <Box display='flex' alignItems='center'>
          <Link to='/signin'>
            <Button variant='text' sx={{ color: 'white', marginRight: '10px' }}>Sign In</Button>
          </Link>
          <Link to='/signup'>
            <Button variant='contained'>Sign Up</Button>
          </Link>
        </Box>

        )}
      </Toolbar>
    </Container>
  </AppBar>
  )
}

export default Navbar