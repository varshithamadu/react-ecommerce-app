import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ProductCard from "../components/ProductCard";
import { Button, CircularProgress, MenuItem,Skeleton,Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import { useContext} from "react";
import { ProductContext } from "../context/ProductContext";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext  } from "../context/CartContext";

function Home() {
  const navigate = useNavigate();
  const {
    search,
    setSearch,
    category,
    setCategory,
    sortBy,
    setSortBy,
    loading,
    error,
    page,
    setPage,
    productsPerPage,
    filteredProducts,
    currentProducts,
    products
  } = useContext(ProductContext);

  const {addToCart} = useContext(CartContext);

  const { addToWishlist} = useContext(WishlistContext);
  
  const suggestions = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 5);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 35,
        }}
      >
        <Skeleton
          variant="rectangular"
          height={300}
          width={250}
        />

      </Box>
    );
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <>
      <TextField
        label="Search Product"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search && suggestions.length > 0 && (
        <div>
          {suggestions.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {product.title}
            </div>
          ))}
        </div>
      )}

      <TextField
        select
        label="Sort By"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        sx={{ mb: 3, ml: 2 }}
      >
        <MenuItem value="">None</MenuItem>

        <MenuItem value="priceLow">
          Price Low → High
        </MenuItem>

        <MenuItem value="priceHigh">
          Price High → Low
        </MenuItem>

        <MenuItem value="nameAsc">
          Name A → Z
        </MenuItem>

        <MenuItem value="nameDesc">
          Name Z → A
        </MenuItem>
      </TextField>

      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Button onClick={() => setCategory("All")}>
          All
        </Button>

        <Button onClick={() => setCategory("electronics")}>
          Electronics
        </Button>

        <Button onClick={() => setCategory("jewelery")}>
          Jewelery
        </Button>
      </Stack>

      <Grid container spacing={2}>
        {currentProducts.map((product) => (
          <Grid
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={product.id}>
              <ProductCard
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                page={page}
                setPage={setPage}
                totalProducts={filteredProducts.length}
                productsPerPage={productsPerPage}
                onAddToCart={() => addToCart(product)}
                onAddToWishList={() => addToWishlist(product)}
              />
          </Grid>
        ))}
      </Grid>

      <Stack
        spacing={2}
        sx={{
          mt: 4,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Pagination
          count={Math.ceil(
            filteredProducts.length / productsPerPage
          )}
          page={page}
          onChange={(event, value) => {
            setPage(value);
          }}
          color="primary"
        />
      </Stack>
    </>
  );
}

export default Home;