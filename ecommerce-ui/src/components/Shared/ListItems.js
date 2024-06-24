import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const MainListItems = (props) => {
  console.log(props);
  const history = useHistory()
  function handleClick() {
    console.log("hello gauttam")
    history.push('/')
    // props.setTabNumber(0)
  }
  function handleClickLogout() {
    console.log("hello gauttam")
    localStorage.setItem('userId', 'null')
    localStorage.setItem('userEmail','null')
    history.push('/signup')
  }
  return (


    <React.Fragment>
      <Link to="/" style={{textDecoration: 'none', color: 'black'}}>

      <ListItemButton
        // onClick={handleClick}
        >
        <ListItemIcon >
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
        </Link>
      <Link to="/cart" style={{textDecoration: 'none', color: 'black'}}>
      <ListItemButton
        // onClick={handleClickCart}
        >
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        
        <ListItemText  primary="Cart" />
      </ListItemButton>
        </Link>
        <Link to="/favorites" style={{textDecoration: 'none', color: 'black'}}>
      <ListItemButton>
        <ListItemIcon>
          <FavoriteIcon />
        </ListItemIcon>
        <ListItemText primary="Favorites" />
      </ListItemButton>
      </Link>
      <ListItemButton
        onClick={handleClickLogout}
      >
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </React.Fragment>
  );
};


export default MainListItems;