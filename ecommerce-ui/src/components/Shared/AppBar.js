import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { deepOrange } from '@mui/material/colors';
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const AppBarCompo = ({ open, toggleDrawer, pages, setSearchVal, productsList }) => {
    const settings = ['Logout'];
    const history = useHistory();
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const location = useLocation()
    const isProductPage = location.pathname === '/products' || location.pathname === '/'
    const isCartPage = location.pathname === '/cart'
    const isFavoritesPage = location.pathname === '/favorites'
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleLogout = () => {
        setAnchorElUser(null);
        localStorage.setItem('userId', 'null')
        localStorage.setItem('userEmail', 'null')
        history.push('/signup')
    };
    var AvatarSymbol = localStorage.getItem('userEmail');
    const [isFocused, setisFocused] = useState(false);

    const handleFocus = () => {
        setisFocused(true);
    }
    const handleBlur = () => {
        setisFocused(false);
    }

    const permittedValues = isProductPage && productsList.map(function (value) {
        return value.name;
    });

    return <AppBar position="absolute" open={open}>
        <Toolbar
            sx={{
                pr: '24px',
            }}
        >
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                    marginRight: '36px',
                    ...(open && { display: 'none' }),
                }}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
            >

                {isProductPage && <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    <Button
                        sx={{ my: 2, color: 'white', display: 'block', fontSize: '18px', fontWeight: 'bold', paddingBottom: "0px", paddingTop: "0px" }}
                    >
                        <Link to="/products" style={{ textDecoration: 'none', color: 'white' }}  >Products</Link>
                    </Button>
                    {pages.map((page) => (
                        <Button
                            key={page}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            <Link to={`/products?category=${page}`} style={{ textDecoration: 'none', color: 'white' }}  >{page}</Link>
                        </Button>
                    ))}
                </Box>
                }
                {
                    isCartPage && <Button
                        sx={{ my: 2, color: 'white', display: 'block', fontSize: '18px', fontWeight: 'bold', paddingBottom: "0px", paddingTop: "0px" }}
                    >
                        Cart
                    </Button>
                }
                {
                    isFavoritesPage && <Button
                        sx={{ my: 2, color: 'white', display: 'block', fontSize: '18px', fontWeight: 'bold', paddingBottom: "0px", paddingTop: "0px" }}
                    >
                        Favorites
                    </Button>
                }

            </Typography>
            {isProductPage && <Search sx={{ padding: '8px', backgroundColor: 'transparent' }}>
                <div className={`autocomp-container ${isFocused ? 'focused' : ''}`} >
                    <Autocomplete
                        sx={
                            {
                                backgroundColor: 'aliceblue',
                                borderRadius: '10px'
                            }
                        }
                        disablePortal

                        onChange={(event, value) => { setSearchVal(value) }}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        id="combo-box-demo"
                        options={permittedValues}
                        renderInput={(params) => <TextField {...params} onChange={e => {
                            setSearchVal(e.target.value)
                            console.log(e.target.value)
                        }} placeholder='Search...' label="" />}
                    /></div>
            </Search>}
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar sx={{ bgcolor: deepOrange[500] }}>{AvatarSymbol ? AvatarSymbol[0].toUpperCase() : 'N'}</Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '49px' }}
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
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleLogout}>
                            <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>

        </Toolbar>
    </AppBar>
}

export default AppBarCompo;
