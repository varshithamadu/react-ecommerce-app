import {Routes, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import {useState} from "react";
import CartPage from "./pages/CartPage";
import ProductDetails from "./pages/ProductDetails";
import Snackbar from "@mui/material/Snackbar";
import CheckOutPage from "./pages/CheckOutPage";
import OrderSuccess from "./pages/OrderSuccess";
import OrdersPage from "./pages/OrdersPage";
import WishlistPage from "./pages/WishlistPage";
import { useContext, useEffect } from "react";
import { CartContext } from "./context/CartContext";
import {ThemeProvider, createTheme} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


function App(){

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const productsPerPage = 8;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  });

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
    })
  }, []);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if(savedWishlist){
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);


  const {cart, setCart} = useContext(CartContext);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if(savedCart){
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  

  useEffect(() => {
    const savedRecentlyViewed = localStorage.getItem("recentlyViewed");

    if(savedRecentlyViewed){
      setRecentlyViewed(
        JSON.parse(savedRecentlyViewed)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "recentlyViewed",
      JSON.stringify(recentlyViewed)
    )
  }, [recentlyViewed]);

  const addToCart = (product) => {
      setOpenSnackBar(true);
      const existingItem = cart.find(
        (item) => item.id === product.id
      );
    
    if(existingItem){
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
            ...item,
            quantity: item.quantity+1
          }
          : item
      );

      setCart(updatedCart);
    }else{
      setCart([
        ...cart, {...product, quantity: 1}
      ])
    }
  };


  const removeFromCart = (index) => {
    const updatedCart = cart.filter(
      (_, i) => i !== index
    );
    setCart(updatedCart);
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesCategory = 
      category ==="All" || product.category === category;

    return matchesSearch && matchesCategory;
  })
  .sort((a,b) => {
    
    if(sortBy == "priceLow") {
      return a.price - b.price;
    }

    if(sortBy == "priceHigh"){
      return b.price - a.price;
    }

    if(sortBy === "nameAsc"){
      return a.title.localeCompare(b.title);
    }

    if(sortBy === "nameDesc"){
      return b.title.localeCompare(a.title);
    }

    return 0;
  })

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const currentProducts = filteredProducts.slice(
    startIndex, endIndex
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) => 
      item.id === id
        ? {
          ...item,
          quantity: item.quantity+1
        }
      :item
    );
    setCart(updatedCart);
  }

  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) => 
        item.id === id
          ? {
            ...item,
            quantity: item.quantity-1
          }
        : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  const addToWishlist = (product) => {
    const exists = wishlist.find(
      (item) => item.id === product.id
    );

    if(!exists){
      setWishlist([...wishlist, product]);
    }
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
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
                element={<ProductDetails 
                  products={products}
                  recentlyViewed={recentlyViewed}
                  setRecentlyViewed={setRecentlyViewed}
                />}
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
                <WishlistPage wishlist = {wishlist}/>

              }
            />

          </Routes>
        </>

    </ThemeProvider>
  );
}
export default App;