import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Button, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const ProductCard = ({ title, price, description, onAddToCart, value, isPending, addedProduct, openSnackBar, handleClose }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleToggleFavorite = (productId) => {
    setIsFavorited(!isFavorited);
    console.log("hiiiiiiiiii")
    if (isFavorited == false) {
      console.log("Adding to favourites: ",);
      const userId = localStorage.getItem('userId');
      const dataValues = {
        product_id: productId,
        user_id: userId
      };
      console.log(dataValues);
      // const blog = { title, body, author };

      fetch('http://127.0.0.1:8080/add_to_favourite', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataValues)
      }).then(() => {
        console.log('product added to favourites');
        //   history.push('/')

      })
    }
    else {
      console.log("item is not favourited")
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
        // const updatedCart = favoriteItems.filter((product) => product.id !== productId);
        // setFavoriteItems(updatedCart);
        console.log('Product deleted from favorites');
        //   history.push('/')
      })

    }
    console.log("byee")
  };
  useEffect(
    () => {
      const userId = localStorage.getItem('userId')
      fetch(`http://127.0.0.1:8080/get_favourite_items/${userId}`)
        .then(res => {
          return res.json();
        })
        .then(data => {
          data.find(function (element) {
            if (element.product_id == value) {
              setIsFavorited(!isFavorited)

            }
          })
        })

    }, []
  )

  const handleAddToCart = () => {
    onAddToCart(value);
  };
  const getRandomImage = () => {
    const randomImageNumber = Math.floor(Math.random() * 50) + 1;
    return `https://picsum.photos/id/${randomImageNumber}/200/300`
  }
  return (
    <Card style={{ marginBottom: "20px", marginTop: "20px", height: "350px" }} >
      <img src={getRandomImage()} alt={title} style={{ width: '100%', height: '40%', objectFit: 'cover' }} />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography color="text.secondary">{description}</Typography>
        <Typography variant="h6" color="primary">
          Price: ${price}
        </Typography>
        <IconButton onClick={() => (handleToggleFavorite(value))} color={isFavorited ? "secondary" : "default"}>
          <FavoriteIcon />
        </IconButton>
        {(!isPending || addedProduct != value) && <Button variant="contained" color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>}
        {isPending && addedProduct == value && <Button disabled variant="contained" color="primary" onClick={handleAddToCart}>
          Adding to Cart
        </Button>}
        <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Added to cart
          </Alert>
        </Snackbar>

      </CardContent>
    </Card>
  );
};

export default ProductCard;
