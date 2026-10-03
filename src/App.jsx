import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext, useMemo, useCallback } from "react";

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

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);
  const [sortBy, setSortBy] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage(
    "recentlyViewed",
    []
  );

  const productsPerPage = 8;

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  });

  // Fetch products
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  const { cart, setCart } = useContext(CartContext);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add product to cart
  const addToCart = useCallback(
    (product) => {
      setOpenSnackBar(true);

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

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.title
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase());

        const matchesCategory =
          category === "All" || product.category === category;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "priceLow") {
          return a.price - b.price;
        }

        if (sortBy === "priceHigh") {
          return b.price - a.price;
        }

        if (sortBy === "nameAsc") {
          return a.title.localeCompare(b.title);
        }

        if (sortBy === "nameDesc") {
          return b.title.localeCompare(a.title);
        }

        return 0;
      });
  }, [products, debouncedSearch, category, sortBy]);

  // Pagination
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex,
    endIndex
  );

  // Calculate total price
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
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

  // Add product to wishlist
  const addToWishlist = useCallback(
    (product) => {
      const exists = wishlist.find(
        (item) => item.id === product.id
      );

      if (!exists) {
        setWishlist([...wishlist, product]);
      }
    },
    [wishlist, setWishlist]
  );

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
              <Home
                search={search}
                setSearch={setSearch}
                filteredProducts={currentProducts}
                addToCart={addToCart}
                category={category}
                setCategory={setCategory}
                addToWishlist={addToWishlist}
                sortBy={sortBy}
                setSortBy={setSortBy}
                loading={loading}
                error={error}
                page={page}
                setPage={setPage}
                totalProducts={filteredProducts.length}
                productsPerPage={productsPerPage}
                products={products}
              />
            }
          />

          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                removeFromCart={removeFromCart}
                totalPrice={totalPrice}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
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
                cart={cart}
                totalPrice={totalPrice}
                setCart={setCart}
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