import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import {Link, useLocation} from 'react-router-dom';
import { IconButton } from '@mui/material';

function NavBar({ cartCount, darkMode, setDarkMode}) {
    const location = useLocation();

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography 
                    variant="h6"
                    sx={{ flexGrow: 1 }}
                >
                    My Store
                </Typography>

                <Badge badgeContent={cartCount} color = "error">
                    <ShoppingCartIcon/>
                </Badge>
                
                <Button 
                    component={Link} 
                    to="/"
                    color={
                        location.pathname === "/"
                        ? "secondary"
                        : "inherit" 
                    }
                >
                    Home
                </Button>

                <Button color="inherit">
                    Products
                </Button>

                <Button
                    component={Link} 
                    to="/cart"
                    color={
                        location.pathname === "/cart"
                        ? "secondary"
                        : "inherit"
                    }
                >
                    Cart
                </Button>

                <Button
                    component={Link}
                    to="/orders"
                    color="inherit"
                >
                    Orders
                </Button>

                <Button
                    component={Link}
                    to="/wishlist"
                    color="inherit"
                >
                    Wishlist
                </Button>

                <IconButton 
                    color="inherit"
                    onClick={() => setDarkMode(!darkMode)}    
                >
                    {darkMode ? "☀️" : "🌙"}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;