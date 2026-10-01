import { Button, Stack, Typography } from "@mui/material";
import {Link} from "react-router-dom";

function OrderSuccess(){
    return(
        <Stack>
            <Typography variant="h4">
                Order Placed Successfully!!
            </Typography>

            <Typography variant="body">
                Thank you for shopping with us.
            </Typography>

            <Button
                component={Link}
                to="/"
                variant="contained"
            >
                Continue Shopping
            </Button>
        </Stack>
    );
}

export default OrderSuccess;