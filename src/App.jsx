import { Routes, Route } from "react-router-dom";
import { useState, useContext } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Snackbar from "@mui/material/Snackbar";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import ProductDetails from "./pages/ProductDetails";
import CheckOutPage from "./pages/CheckOutPage";
import OrderSuccess from "./pages/OrderSuccess";
import OrdersPage from "./pages/OrdersPage";
import WishlistPage from "./pages/WishlistPage";

import { CartContext } from "./context/CartContext";
import useLocalStorage from "./hooks/useLocalStorage";
import { WishlistContext } from "./context/WishlistContext";
import { ProductContext } from "./context/ProductContext";

function App() {

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [orders, setOrders] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage(
    "recentlyViewed",
    []
  );

  // Fetch products
  // useEffect(() => {
  //   fetch("https://fakestoreapi.com/products")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProducts(data);
  //       setLoading(false);
  //     })
  //     .catch(() => {
  //       setError("Failed to load products..");
  //       setLoading(false);
  //     });
  // }, []);

  const { cart } = useContext(CartContext);

  const {
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useContext(WishlistContext);

  const { products } = useContext(ProductContext);
  
  // MUI theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <>
        <NavBar
          cartCount={cart.length}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <Snackbar
          open={openSnackBar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackBar(false)}
          message="Product added to cart"
        />

        <Routes>
          <Route
            path="/"
            element={
              <Home />
            }
          />

          <Route
            path="/cart"
            element={
              <CartPage />
            }
          />

          <Route
            path="product/:id"
            element={
              <ProductDetails
                products={products}
                recentlyViewed={recentlyViewed}
                setRecentlyViewed={setRecentlyViewed}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <CheckOutPage
                orders={orders}
                setOrders={setOrders}
              />
            }
          />

          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

          <Route
            path="/orders"
            element={<OrdersPage orders={orders} />}
          />

          <Route
            path="/wishlist"
            element={
              <WishlistPage wishlist={wishlist} />
            }
          />
          
        </Routes>
      </>
    </ThemeProvider>
  );
}

export default App;