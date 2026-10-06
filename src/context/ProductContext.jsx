import {createContext, useState, useMemo, useEffect} from "react";
import productsData from "../data/products.js";
import useDebounce from "../hooks/useDebounce";

export const ProductContext = createContext();

function ProductProvider({ children }) {
    const [products, setProducts] = useState(productsData);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sortBy, setSortBy] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const productsPerPage = 8;

    const debouncedSearch = useDebounce(search, 500);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = 
                product.title.
                    toLowerCase().includes(debouncedSearch.toLowerCase());

            const matchesCategory = 
                category === "All" || product.category === category;
            return (matchesSearch && matchesCategory);
        })
        .sort((a, b) => {
            if (sortBy === "priceLow") {
                return a.price - b.price;
            }
            if (sortBy === "priceHigh") {
                return b.price - a.price;
            }
            if (sortBy === "nameAsc") {
                return a.name.localeCompare(b.name);
            }
            if (sortBy === "nameDesc") {
                return b.name.localeCompare(a.name);
            }
            return 0;
        });
    }, [products, debouncedSearch, category, sortBy]);

    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    return (
        <ProductContext.Provider
            value={{
                products,

                search,
                setSearch,

                category,
                setCategory,

                sortBy,
                setSortBy,

                page,
                setPage,

                loading,
                error,

                productsPerPage,
                
                filteredProducts,
                currentProducts,
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;