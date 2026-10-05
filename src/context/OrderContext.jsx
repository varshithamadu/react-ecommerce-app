import { createContext, useState, useEffect, use } from "react";

export const OrderContext = createContext();
function OrderProvider({ children }){
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const savedOrders = localStorage.getItem("orders");
        if(savedOrders) {
            setOrders(JSON.parse(savedOrders));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    const addOrder = (order) => {
        setOrders([...orders, order]);
    }

    return(
        <OrderContext.Provider
            value={{orders, addOrder, setOrders}}
        >
            {children}
        </OrderContext.Provider>
    );
}

export default OrderProvider;