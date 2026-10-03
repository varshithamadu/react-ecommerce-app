import { Button } from "@mui/material";
import Cart from "../components/Cart";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function CartPage(){
    const {
        cart,
        removeFromCart,
        totalPrice,
        increaseQuantity,
        decreaseQuantity
    } = useContext(CartContext);
    return(
        <div>
            <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                totalPrice={totalPrice}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
            />

            <Button
                component={Link}
                to="/checkout"
                variant="contained"
            >
                Proceed to submit
            </Button>
        </div>
    );

}

export default CartPage;