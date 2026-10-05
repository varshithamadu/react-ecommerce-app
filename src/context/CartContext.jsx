import { createContext, useState, useEffect, useCallback } from "react";

export const CartContext = createContext();

function CartProvider({ children }){
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = localStorage.getItem("cart");

        if(savedCart){
            setCart(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Add product to cart
      const addToCart = useCallback(
        (product) => {

          const existingItem = cart.find(
            (item) => item.id === product.id
          );
    
          if (existingItem) {
            const updatedCart = cart.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item
            );
    
            setCart(updatedCart);
          } else {
            setCart([...cart, { ...product, quantity: 1 }]);
          }
        },
        [cart, setCart]
      );

      // Remove product from cart
        const removeFromCart = useCallback(
          (index) => {
            const updatedCart = cart.filter((_, i) => i !== index);
            setCart(updatedCart);
          },
          [cart, setCart]
        );

        // Increase quantity
          const increaseQuantity = useCallback(
            (id) => {
              const updatedCart = cart.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item
              );
        
              setCart(updatedCart);
            },
            [cart, setCart]
          );

          // Decrease quantity
            const decreaseQuantity = useCallback(
              (id) => {
                const updatedCart = cart
                  .map((item) =>
                    item.id === id
                      ? {
                          ...item,
                          quantity: item.quantity - 1,
                        }
                      : item
                  )
                  .filter((item) => item.quantity > 0);
          
                setCart(updatedCart);
              },
              [cart, setCart]
            );

            // Calculate total price
            const totalPrice = cart.reduce(
                (total, item) => total + item.price * item.quantity,
                0
            );

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                totalPrice

            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;