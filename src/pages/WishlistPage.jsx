import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import { Button } from "@mui/material";

function WishlistPage(){

    const {wishlist, removeFromWishlist} = useContext(WishlistContext);

    if(wishlist.length == 0){
        return <h2>Your wishlist is empty</h2>
    }

    return(
        <div>
            <h1>Wishlist</h1>

            {wishlist.map((item) => (
                <div key={item.id}>
                    {item.title}

                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => removeFromWishlist(item.id)}
                    >
                        Remove
                    </Button>
                </div>
            ))}
        </div>
    );
}

export default WishlistPage;