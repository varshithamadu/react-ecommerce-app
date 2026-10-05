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

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const { cart } = useContext(CartContext);
  
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
              <ProductDetails />
            }
          />

          <Route
            path="/checkout"
            element={<CheckOutPage />}
          />

          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

          <Route
            path="/orders"
            element={<OrdersPage />}
          />

          <Route
            path="/wishlist"
            element={
              <WishlistPage />
            }
          />
          
        </Routes>
      </>
    </ThemeProvider>
  );
}

export default App;