import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import FavoritesComponent from './FavouritesComponent';
import AppBarCompo from '../Shared/AppBar';
import DashboardDrawer from '../Shared/Drawer';
const defaultTheme = createTheme();
export default function FavoritesComp() {
    const [open, setOpen] = React.useState(true);
    // const {category} = useParams();
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBarCompo open={open} toggleDrawer={toggleDrawer}/>
                <DashboardDrawer open={open} toggleDrawer={toggleDrawer} />
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
                    <FavoritesComponent />
                </Box>
            </Box>
        </ThemeProvider>
    );
}