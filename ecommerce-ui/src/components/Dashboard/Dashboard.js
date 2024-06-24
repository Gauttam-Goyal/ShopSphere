import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import ProductList from '../Product/ProductsList';
import AppBarCompo from '../Shared/AppBar';
import DashboardDrawer from '../Shared/Drawer';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
const pages = ['Men', 'Women', 'Kids'];
const defaultTheme = createTheme();
export default function Dashboard() {
    const [searchVal, setSearchVal] = useState("");
    const [open, setOpen] = React.useState(true);
    const [tabNumber, setTabNumber] = useState(0)
    const [productsList,setProductsList] = useState([]);
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const category = queryParams.get('category')
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            {console.log(category, "fmndsifjgnisnfsofism")}
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBarCompo open={open} toggleDrawer={toggleDrawer} tabNumber={tabNumber} pages={pages} setSearchVal= {setSearchVal}  productsList={productsList}/>
                <DashboardDrawer open={open} toggleDrawer={toggleDrawer} setTabNumber={setTabNumber}  />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <ProductList searchVal = {searchVal} setProductsList={setProductsList} category = {category} />

                </Box>
            </Box>
        </ThemeProvider>
    );
}