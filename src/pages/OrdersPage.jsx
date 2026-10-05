import { OrderContext } from "../context/OrderContext";
import { CartContext } from "../context/CartContext";
import { useContext } from "react";

function OrdersPage({}){

    const {orders} = useContext(OrderContext);
    
    return(
        <div>
            <h1>My Orders</h1>

            {orders.map((order) => (
                <div key={order.id}>
                    <h3>Order #{order.id}</h3>

                    {order.items.map((item) => (
                        <div key={item.id}>
                            {item.name} x {item.quantity}
                        </div>
                    ))}

                    <h4>Total: {order.totalPrice}</h4>
                </div>
            ))}
        </div>
    );
}

export default OrdersPage;