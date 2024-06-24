import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  InputBase,
} from '@mui/material';
import LoaderAnimation from './CartLoaderAnimation';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { withStyles } from '@mui/styles';
const CssListItemIcon = withStyles({
  root: {
    "&:hover":{
      cursor: 'pointer',
      color: '#494747'
    }
    
  }
})(ListItemIcon);
const CartComponent = () => {
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };
  const handleIncrease = async (product) => {
    console.log(product)
    const nextCounters = cart.map((c, i) => {
      if (c.id == product.id) {
        c.quantity++;
        return c;
      } else {
        return c;
      }
    });
    setCart(nextCounters)
    const userId = localStorage.getItem('userId');
    const dataValues = {
      product_id: product.id,
      user_id: userId
    };
    fetch('http://127.0.0.1:8080/add_to_cart', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataValues)
    }).then(() => {

      console.log("quantity updated")

    })
  };

  const handleDecrease = async (product) => {
    console.log(product)
    const nextCounters = cart.map((c, i) => {
      if (c.id == product.id && c.quantity > 1) {
        c.quantity--;
        return c;
      } else {
        return c;
      }
    });
    setCart(nextCounters)

    const userId = localStorage.getItem('userId');
    const dataValues = {
      product_id: product.id,
      user_id: userId
    };
    fetch('http://127.0.0.1:8080/decreaseCartQuantity', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataValues)
    }).then(() => {

      console.log("quantity updated")

    })
  };
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    console.log("Removing from cart ");
    const userId = localStorage.getItem('userId');
    const dataValues = {
      product_id: productId,
      user_id: userId
    };
    console.log(dataValues);
    fetch('http://127.0.0.1:8080/remove_from_cart', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataValues)
    }).then(() => {
      const updatedCart = cart.filter((product) => product.id !== productId);
      setCart(updatedCart);
      console.log('Product deleted from cart');
      setOpenSnackBar(true)
      //   history.push('/')
    })
  };

  // Function to calculate total cart value
  const calculateTotal = () => {
    var totalValue = cart.reduce((total, product) => total + parseFloat(product.price * product.quantity), 0);
    return totalValue.toFixed(2)
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setIsLoading(true)
        // Fetch cart items from the first API
        const userId = localStorage.getItem('userId')
        const cartItemsResponse = await fetch(`http://127.0.0.1:8080/get_cart_items/${userId}`);
        const cartItemsData = await cartItemsResponse.json();

        const updatedCart = []
        const detailsPromises = cartItemsData.map(async (cartItem) => {

          const productDetailsResponse = await fetch(`http://127.0.0.1:8080/getProductDetails/${cartItem.product_id}`);
          const productDetailsData = await productDetailsResponse.json();
          console.log(productDetailsData, "hghghhh")
          const cartItemdetails = productDetailsData[0];
          cartItemdetails.quantity = cartItem.quantity;
          updatedCart.push(cartItemdetails);
          console.log(cartItemdetails)
          return productDetailsData;
        });

        await Promise.all(detailsPromises);
        setCart(updatedCart);
        setIsLoading(false)
        console.log(updatedCart, "hiiii");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCartData();
  }, []);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {isLoading &&
        <LoaderAnimation />}
      {!isLoading && cart.length === 0 ? (
        <Typography variant="subtitle1">Your cart is empty.</Typography>
      ) : (

        <Grid container spacing={2}>
          {!isLoading && cart && cart.map((product) => (
            <Grid item xs={12} key={product.id}>
              <Card sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={{ textAlign: 'left' }}>
                    ${product.price}
                  </Typography>
                </CardContent>
                <div style={{ alignSelf: 'center', marginLeft: 'auto', marginRight: '16px' }}>
                  {product.quantity > 1 && <Button variant="outlined" color="primary" onClick={() => { handleDecrease(product) }}>
                    -
                  </Button>}
                  {product.quantity <= 1 && <Button variant="outlined" color="primary" disabled onClick={() => { handleDecrease(product) }}>
                    -
                  </Button>}
                  {/* <InputBase style={{ margin: '0 8px', width: '10px' , minval: '0'}} value={product.quantity}></InputBase> */}
                  <span style={{ margin: '0 8px' }}>{product.quantity}</span>
                  <Button variant="outlined" color="primary" onClick={() => { handleIncrease(product) }}>
                    +
                  </Button>
                </div>
                  <CssListItemIcon onClick={() => removeFromCart(product.id)} style={{ alignSelf: 'center', marginRight: 2 }} >
                    <DeleteIcon />
                  </CssListItemIcon>
                <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                  >
                    Product Removed From Cart
                  </Alert>
                </Snackbar>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Card sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <CardContent>
                <Typography variant="h6">Total:</Typography>
              </CardContent>
              <CardContent>
                <Typography variant="h6">${calculateTotal()}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
              Checkout
            </Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default CartComponent;