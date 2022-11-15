import React, { useState } from 'react';
// React Router
import { useNavigate, useParams } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';
import { selectProducts } from '../../redux/features/productSlice';
// Firebase
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../firebase/config';
import { addDoc, collection, doc, setDoc, Timestamp } from 'firebase/firestore';
// MUI
import { Box, Button, Grid, Paper, TextField, Typography} from '@mui/material';
// React Toastify
import { toast } from 'react-toastify';

const categories = [
  {id: 1, cat: 'Woman'},
  {id: 2, cat: 'Accessories'},
  {id: 3, cat: 'Man'}
];

const initalState = {
  title: "",
  description: "",
  price: 0,
  category: "",
  imageURL: "",
}

const AddProducts = () => {
  const navigate = useNavigate();
  const [uploadProgress, setUploadProgress] = useState(0);
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((item) => item.id === id);

  const detectForm = (id, f1, f2) => {
    if(id === 'ADD'){
      return f1;
    } else {
      return f2
    }
  }

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, {...initalState}, productEdit)
    return newState;
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
        });
      }
    );
  };
  
  const addProduct = (e) => {
    e.preventDefault();
    console.log(product);

    try {
      const docRef = addDoc(collection(db, "products"), {
        title: product.title,
        description: product.description,
        price: Number(product.price),
        category: product.category,
        imageURL: product.imageURL,
        createdAt: Timestamp.now().toDate()
      });
        setProduct({...initalState});

        toast.success('Product Uploaded');
        navigate('/allProducts');
      } catch (error) {
          toast.error(error.message);
      }
    };

  const editProduct = (e) => {
    e.preventDefault();

    if(product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

    try{
      setDoc(doc(db, "products", id), {
        title: product.title,
        description: product.description,
        price: Number(product.price),
        category: product.category,
        imageURL: productEdit.imageURL,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate()
      });

      toast.success('Product edited successfully');
      navigate('/allProducts');
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
    <Grid container component="main" display='flex' alignItems='center' justifyContent='center' height='92vh'>
    <Grid item component={Paper}>
      <Box p={5} textAlign='center'>
        <Typography component="h1" variant="h5">
          {detectForm(id, 'Add Product', 'Edit Product')}
        </Typography>
        <form noValidate style={{ marginTop: '2rem' }} onSubmit={detectForm(id, addProduct, editProduct)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            name="title"
            label="Title"
            type="text"
            onChange={(e) => handleInputChange(e)}
            value={product.title}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            name="description"
            label="Description"
            type="text"
            onChange={(e) => handleInputChange(e)}
            value={product.description}
          />
            <div style={{ margin: '15px 0 15px 0', textAlign: 'left'}}>
              {uploadProgress === 0 ? null : (
                <div>
                  <div style={{ width: `${uploadProgress}%` }}>
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                placeholder="Product Image"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />

              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  required
                  placeholder="Image URL"
                  name="imageURL"
                  value={product.imageURL}
                  disabled
                />
              )}
            </div>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            autoFocus
            name="price"
            label="Price"
            type="number"
            onChange={(e) => handleInputChange(e)}
            value={product.price}
          />
          <select
            required
            name="category"
            value={product.category}
            onChange={(e) => handleInputChange(e)}
            style={{
              width: '100%',
              margin: '15px 0 5px 0',
            }}
            >
              <option value='' disabled>
                Choose Category
              </option>
              {categories.map((category, id) => (
                <option key={id}>
                  {category.cat}
                </option>
              ))}
          </select>
          <Box mt={3} mb={3}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              {detectForm(id, 'Add Product', 'Edit Product')}
            </Button>
          </Box>
        </form>
      </Box>
    </Grid>
  </Grid>
  </>
  )
}

export default AddProducts