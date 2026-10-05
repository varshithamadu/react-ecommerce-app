import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";

function CheckOutPage(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    
    const navigate = useNavigate();

    const {cart, setCart, totalPrice} = useContext(CartContext);
    const {orders, setOrders} =useContext(OrderContext);

    const handleOrder = () => {
        if(!name.trim()){
            alert("Please enter your name");
            return;
        }

        if (!email.trim()) {
            alert("Please enter your email");
            return;
        }

        if (!phone.trim()) {
            alert("Please enter your phone number");
            return;
        }

        if (phone.length !== 10) {
            alert("Phone number must be 10 digits");
            return;
        }

        if (!address.trim()) {
            alert("Please enter your address");
            return;
        }

        const newOrder = {
            id: Date.now(),
            items: cart,
            totalPrice: totalPrice
        };

        setOrders([...orders, newOrder])
        setCart([]);
        navigate("/order-success");
    };

    return(
        <div>
            <h1>Checkout</h1>
            
            <TextField
                label="Full name"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <TextField
                label="Email"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
                label="Phone Number"
                fullWidth
                margin="normal"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />

            <TextField
                label="Address"
                fullWidth
                margin="normal"
                multiline
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />

            <h2>Order Summary</h2>
            {cart.map((item) => (
                <div key={item.id}>
                    {item.name} x {item.quantity}
                </div>
            ))}

            <h2>Total: {totalPrice}</h2>
            <Button
                variant="contained"
                onClick={handleOrder}
            >
                Place order
            </Button>
        </div>
    );
}

export default CheckOutPage;