import { useParams} from "react-router-dom";
import products from "../data/products";
import { useState } from "react";
import { Rating} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function ProductDetails(){
    const [rating, setRating] = useState(0);
    const [reviewName, setReviewName] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [reviews, setReviews] = useState([]);
    const {id} = useParams();
    const product=products.find(
        (p) => p.id === Number(id)
    );

    const handleReview = () => {
        if(!reviewName.trim()){
            alert("Enter Name");
            return;
        }
        if(!reviewText.trim()){
            alert("Enter Review");
            return;
        }

        const newReview = {
            id: Date.now(),
            name: reviewName,
            review: reviewText,
            rating: rating
        };

        setReviews([...reviews, newReview])

        // setReviewName("");
        // setReviewText("");
        // setRating(0);
    };

    return(
        <div>
            <h1>{product.name}</h1>
            <img 
                src={product.image}
                width="300"
            />
            <h2>{product.price}</h2>
            
            <Rating
                value={rating}
                onChange={(event,newValue) => {
                    setRating(newValue);
                }}
            />

            <p>Your rating: {rating}</p>
            <p>{product.description}</p>

            <TextField
                label="Your Name"
                fullWidth
                margin="normal"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
            />

            <TextField
                label="Write Review"
                fullWidth
                multiline
                rows={4}
                margin="normal"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
            />

            <Button
                variant="contained"
                onClick={handleReview}
            >
                Submit Review
            </Button>

            <h2>Customer Reviews</h2>

            {reviews.map((review) => (
                <div key={review.id}>
                    <h4>{review.name}</h4>

                    <Rating
                        value={review.rating}
                        readOnly
                    />

                    <p>{review.review}</p>
                    <hr/>
                </div>
            ))}
        </div>
    );
}

export default ProductDetails;