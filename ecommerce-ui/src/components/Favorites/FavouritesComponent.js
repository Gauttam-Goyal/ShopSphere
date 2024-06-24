import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from '@mui/material';
import LoaderAnimation from '../Cart/CartLoaderAnimation';
import DashboardLoaderAnimation from '../Shared/LoaderAnimation';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
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
const FavoritesComponent = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };
  const getRandomImage = () => {
    const randomImageNumber = Math.floor(Math.random() * 50) + 1;
    return `https://picsum.photos/id/${randomImageNumber}/200/300`
  }
  const removeFromFavorites = (productId) => {
    console.log("Removing from favorites ");
    const userId = localStorage.getItem('userId');
    const dataValues = {
      product_id: productId,
      user_id: userId
    };
    console.log(dataValues);
    // const blog = { title, body, author };

    fetch('http://127.0.0.1:8080/remove_from_favourite', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataValues)
    }).then(() => {
      const updatedCart = favoriteItems.filter((product) => product.id !== productId);
      setFavoriteItems(updatedCart);
      console.log('Product deleted from favorites');
      setOpenSnackBar(true)
      //   history.push('/')
    })

  };
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setIsLoading(true)
        // Fetch cart items from the first API
        const userId = localStorage.getItem('userId')
        const FavoritesItemsResponse = await fetch(`http://127.0.0.1:8080//get_favourite_items/${userId}`);
        const FavoritesItemsData = await FavoritesItemsResponse.json();
        // setCartItems(cartItemsData);

        // Fetch product details for each cart item from the second API
        const updatedFavorites = []
        const detailsPromises = FavoritesItemsData.map(async (FavoritesItem) => {
          const productDetailsResponse = await fetch(`http://127.0.0.1:8080/getProductDetails/${FavoritesItem.product_id}`);
          const productDetailsData = await productDetailsResponse.json();
          console.log(productDetailsData, "hghghhh")
          updatedFavorites.push(productDetailsData[0]);
          return productDetailsData;
        });

        await Promise.all(detailsPromises);
        setFavoriteItems(updatedFavorites);
        setIsLoading(false)
        console.log(updatedFavorites, "hiiii");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCartData();
  }, []);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Favorites
      </Typography>
      {isLoading &&
        <DashboardLoaderAnimation />}
      {!isLoading && favoriteItems.length === 0 ? (
        <Typography variant="subtitle1">Your favorites list is empty.</Typography>
      ) : (
        <Grid container spacing={3}>
          {favoriteItems && favoriteItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card sx={{ height: 320 , backgroundColor: '#f2f6f9'}}>
                <div>
                  <Typography style={{marginTop: '12px', marginLeft: '15px', fontWeight: 'bold', fontSize: '20px', textAlign: 'left'}}>{item.name}</Typography>
                </div>
                <img src={getRandomImage()} alt={item.name} style={{ borderRadius: '20px', width: '100%', height: '60%',padding:'15px', objectFit: 'cover' }} />
                <CardContent style={{ display: 'flex', flexDirection: 'row' }}>
                  <div>
                    <Typography level="body-xs">Total price:</Typography>
                    <Typography fontSize="16px" fontWeight="bold">
                    ${item.price}
                    </Typography>
                  </div>
                  <CssListItemIcon onClick={() => removeFromFavorites(item.id)} style={{ alignSelf: 'center', marginLeft:'auto', marginRight: '-20px' }} >
                    <DeleteIcon sx={{ fontSize: 30 }} />
                  </CssListItemIcon>
                </CardContent>
                <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleClose}>
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                  >
                    Product Removed From Favorites
                  </Alert>
                </Snackbar>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FavoritesComponent;