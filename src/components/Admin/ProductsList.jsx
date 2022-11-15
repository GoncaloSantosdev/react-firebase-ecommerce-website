import React, { useState, useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectProducts, STORE_PRODUCTS } from '../../redux/features/productSlice';
// Hooks
import useFetchCollection from '../../customHooks/useFetchCollection';
// Firebase
import { db, storage } from '../../firebase/config';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
// MUI
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
// Toastify
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ProductsList = () => {
  const dispatch = useDispatch();
  const { data } = useFetchCollection('products');
  const products = useSelector(selectProducts);

  useEffect(() => {
      dispatch(STORE_PRODUCTS({
        products: data,
      }));
  }, [dispatch, data]);
  
  const deleteProduct = async (id, imageURL) => {
    try{
      await deleteDoc(doc(db, "products", id));

      const storageRef = ref(storage, imageURL);
      await deleteObject(storageRef);
      toast.success('Product has been deleted');
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Container>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Image</TableCell>
          <TableCell>Product</TableCell>
          <TableCell align="right">Category</TableCell>
          <TableCell align="right">Price</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {products.map((product) => (
          <TableRow
            key={product.title}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row"><img src={product.imageURL} alt="" style={{ width: '150px', height: '130px', objectFit: 'cover'}}/></TableCell>
            <TableCell component="th" scope="row">{product.title}</TableCell>
            <TableCell align="right">{product.category}</TableCell>
            <TableCell align="right">${product.price}</TableCell>
            <TableCell align="right"><Link to={`/addProduct/${product.id}`}><ModeEditIcon sx={{ color: 'green' }}/></Link> <DeleteIcon sx={{ cursor: 'pointer', color: 'red' }} onClick={() => deleteProduct(product.id, product.imageURL)}/></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </Container>
  )
}

export default ProductsList