import {createContext, useContext} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const RecentlyViewedContext = createContext(useContext);

function RecentlyViewedProvider({ children }){
    const [recentlyViewed, setRecentlyViewed] = useLocalStorage("recentlyViewed", []);
    const addRecentlyViewed = (product) => {
        setRecentlyViewed((prev) => {
            const filtered = prev.filter(
                (item) => item.id !== product.id
            );

            return [product, ...filtered].slice(0,5); 
        });
    };

    return(
        <RecentlyViewedContext.Provider
            value = {{recentlyViewed, addRecentlyViewed}}
        >
            {children}
        </RecentlyViewedContext.Provider>
    );
}

export default RecentlyViewedProvider;