import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";

function ProductCard({ id, title, price, image, onAddToCart, onAddToWishList}) {
    return(
    <Card
        component={Link}
        to={`/product/${id}`}
        sx={{
            width: 300,
            height: 450,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",    
            marginLeft: 2,
            marginTop: 2,
            backgroundColor: "#f5f5f5",
            textDecoration: "none"
        }}
        >
            <CardMedia
                component="img"
                height="200"
                width="200"
                image={image}
                sx={{ 
                    objectFit: "contain", 
                    padding: 2,
                    p: 2
                }}
            />

            <CardContent 
                sx={{ 
                    flexGrow: 1 
                }}
            >
                <Typography 
                    variant="h6"
                    sx={{
                        height: 60,
                        overflow: "hidden",
                    }}
                >
                    {title}
                </Typography>

                <Typography variant="body1">
                    {price}
                </Typography>

                <Button 
                    variant="contained"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onAddToCart();
                    }}
                >
                    Add to Cart
                </Button>

                <Button
                    variant="outlined"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onAddToWishList();
                    }}

                >
                    ❤️ Wishlist
                </Button>
            </CardContent>
        </Card>
    );
}

export default ProductCard;