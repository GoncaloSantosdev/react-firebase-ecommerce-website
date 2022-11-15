import React from 'react';
// React Router
import { Routes, Route } from 'react-router-dom';
// Pages
import { AddProduct, Address, AllProducts, Orders, Cart, Home, Payment, Review, SignIn, SignUp, AllOrders } from './pages';
// Components
import { Footer, Navbar, ProductDetails, CheckoutSuccess, AdminOrderDetails } from './components';
import AdminRoute from './components/Admin/AdminRoute';
// React Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product-details/:id' element={<ProductDetails />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/orders' element={<Orders />} />
        {/* Checkout */}
        <Route path='/checkout/address' element={<Address />} />
        <Route path='/checkout/payment' element={<Payment />} />
        <Route path='/checkout/review' element={<Review />} />
        <Route path='/checkout-success' element={<CheckoutSuccess />} />
        {/* Admin */}
        <Route path='/addProduct/:id' element={
          <AdminRoute>
            <AddProduct />
          </AdminRoute>
        } />
        <Route path='/allProducts' element={
          <AdminRoute>
            <AllProducts />
          </AdminRoute>
        } />
        <Route path='/allOrders' element={
          <AdminRoute>
            <AllOrders />
          </AdminRoute>
        } />
        <Route path='/order-details/:id' element={
          <AdminRoute>
            <AdminOrderDetails />
          </AdminRoute>
        } />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
