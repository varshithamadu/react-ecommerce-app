import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Cart({ cart, removeFromCart, 
    totalPrice, increaseQuantity, decreaseQuantity }){
        if(cart.length === 0){
                return(
                    <h2>Your Cart is empty</h2>
                );
        }
        
    return(
        <div>
            <h2>Shopping Cart</h2>

            {cart.map((item,index) => (
                <div key={index}>
                    <h3>{item.name}</h3>

                    <p>Price: {item.price}</p>

                    <Stack
                            direction="row"
                            spacing={2}
                            >
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => decreaseQuantity(item.id)}
                            >
                                -
                            </Button>

                            <Typography>
                                {item.quantity}
                            </Typography>

                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => increaseQuantity(item.id)}
                            >
                                +
                            </Button>

                            <Button
                                variant="contained"
                                onClick={() => removeFromCart(index)}
                            >
                                Remove
                            </Button>
                        </Stack>
                    
                </div>
            ))}

            <h2>Total : {totalPrice}</h2> 
        </div>
    );
}

export default Cart;