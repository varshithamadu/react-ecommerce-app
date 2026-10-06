import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import products from "../data/products";

export const ReviewContext = createContext();

function ReviewProvider({ children }){
    
    const[reviews, setReviews] = useLocalStorage("reviews", {});
    const addReview = (productId, review) => {
        setReviews((prev) => ({
            ...prev,
                [productId]: [...(prev[productId] || []),
                review
            ]
        }));
    }

    const getReviews = (productId) => {
        return reviews[productId] || [];
    };

    const deleteReview = (productId, reviewId) => {
        setReviews((prev) => ({
            ...prev,
            [productId]: prev[productId].filter(
                (review) => review.id !== reviewId
            )
        }));
    };

    const getAverageRating = (productId) => {
        const productReviews = reviews[productId] || [];

        if(productReviews.length === 0){
            return 0;
        }

        const total = productReviews.reduce(
            (sum, review) => sum + review.rating,
            0
        );
        
        return( total / productReviews.length ).toFixed(1);
    }

    return (
        <ReviewContext.Provider
            value={{
                reviews,
                addReview,
                getReviews,
                deleteReview,
                getAverageRating
            }}
        >
            {children}
        </ReviewContext.Provider>
    );
}

export default ReviewProvider;