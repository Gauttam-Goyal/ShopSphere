import * as React from 'react';
import Container from '@mui/material/Container';
import ProductCard from './ProductCard';
import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Grid from '@mui/material/Grid';
import DashboardLoaderAnimation from '../Shared/LoaderAnimation';
const ProductList = ({searchVal, setProductsList , category}) => {
    const [products, setProducts] = useState([]);
    const [isPending, setIsPending] = useState(false)
    const [addedProduct, setAddedProduct] = useState('')
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    // const {category} = useParams()
    const filterData = (query, data) => {
        console.log("hi you are searching")
        if (!query) {
          return data;
        } else {
          return data.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()));
        }
      };
    const dataFiltered = filterData(searchVal, products);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false);
    };
    const handleAddToCart = (productId) => {
        // e.preventDefault();
        setIsPending(true);
        setAddedProduct(productId)
        console.log("Adding to cart: ", products);
        const userId = localStorage.getItem('userId');
        const dataValues = {
            product_id: productId,
            user_id: userId
        };
        console.log(dataValues);
        // const blog = { title, body, author };

        fetch('http://127.0.0.1:8080/add_to_cart', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataValues)
        }).then(() => {
            setIsPending(false)
            setAddedProduct('')
            console.log('new blog added');
            setOpenSnackBar(true)
            //   history.push('/')
        })
    }

    useEffect(() => {

        async function fetchProductsByCategory(category_id) {


            fetch(`http://127.0.0.1:8080/getProducts/${category_id}`)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    setProducts(data)
                    // products = data
                    console.log("hi")
                    console.log(data)
                })

        }
        async function fetchAllProducts() {
            fetch(`http://127.0.0.1:8080/getProducts`)
                .then(res => {
                    return res.json();
                })
                .then(data => {
                    setProducts(data)
                    setProductsList(data)
                    // products = data
                    console.log("hello")
                    console.log(data)
                })
        }
        // console.log(selectedCategory, "hi")
        console.log(category, 'helloooo')
        if (category) {
            if(category=='Men')
            {
                fetchProductsByCategory('1');
            }
            if(category=='Women')
            {
                fetchProductsByCategory('2');
            }
            if(category=='Kids')
            {
                fetchProductsByCategory('3');
            }
        }
        else {
            fetchAllProducts();
        }
    }, [category])
    return <Container maxWidth={false}>
        {products.length == 0 && <DashboardLoaderAnimation/>}
        <Grid container spacing={3}>
            {products && dataFiltered.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} >
                    <ProductCard
                        key={product.id}
                        title={product.name}
                        price={product.price}
                        description={product.description}
                        onAddToCart={handleAddToCart}
                        value={product.id}
                        isPending={isPending}
                        addedProduct={addedProduct}
                        openSnackBar={openSnackBar}
                        handleClose={handleClose}
                    />

                </Grid>
            ))}


        </Grid>
    </Container>

}

export default ProductList;