import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ProductCard from "../components/ProductCard";
import { Button, CircularProgress, Menu, MenuItem, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";

function Home({search, setSearch,filteredProducts, addToCart,
      category, setCategory, addToWishlist, sortBy, setSortBy, loading, error, page, 
       setPage, totalProducts, productsPerPage}) {

        if(loading) {
            return (
                <Box 
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: 35
                    }}
                >
                    <CircularProgress/>
                </Box>
            );
        }

        if(error) {
            return <h3>{error}</h3>
        }

    return(
        <>
            <TextField
                label="Search Product"
                variant="outlined"
                fullWidth
                sx={{mb : 3}}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <TextField 
                select
                label="Sort By"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                sx={{ mb: 3, ml: 2}}
            >
                <MenuItem value="">
                    None
                </MenuItem>

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
                sx={{ mb: 3}}
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
            <Grid container spacing = {2}>
                {filteredProducts.map((product) => (
                    <Grid key={product.id}>
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
                        totalProducts / productsPerPage
                    )}

                    page={page}
                    onChange={(event,value) => {
                        setPage(value);
                    }}

                    color="primary"
                />
            </Stack>
        </>
    );
}

export default Home;