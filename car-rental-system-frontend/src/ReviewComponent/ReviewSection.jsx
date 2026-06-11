import { useState, useEffect } from "react";
import reviewService from "./reviewService";
import { toast } from "react-toastify";

const ReviewSection = ({ carId }) => {
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);

    const customer = JSON.parse(sessionStorage.getItem("active-customer"));

    useEffect(() => {
        if (carId) {
            fetchReviews();
        }
    }, [carId]);

    const fetchReviews = async () => {
        try {
            const response = await reviewService.getAllReviewsByCarId(carId);
            setReviews(response.data);
        } catch (error) {
            console.error("Error fetching reviews", error);
        }
    };

    const addReview = async (e) => {
        e.preventDefault();
        if (!customer) {
            toast.warning("Please login to comment.");
            return;
        }

        const request = {
            comment: comment,
            rating: rating,
            carId: carId,
            customerId: customer.id,
        };

        try {
            await reviewService.addReview(request);
            toast.success("Comment added successfully.");
            setComment("");
            setRating(5);
            fetchReviews(); // Refresh list
        } catch (error) {
            console.error("Error adding review", error);
            toast.error("An error occurred while adding the comment.");
        }
    };

    const renderStars = (rating) => {
        let stars = "";
        for (let i = 0; i < 5; i++) {
            if (i < rating) stars += "★";
            else stars += "☆";
        }
        return <span style={{ color: "#ffd700", fontSize: "1.2rem" }}>{stars}</span>;
    };

    return (
        <div className="card mt-4 mb-5" style={{ backgroundColor: "#2c2c2c", color: "white" }}>
            <div className="card-header custom-bg text-color">
                <h4 className="mb-0"><b>Reviews ({reviews.length})</b></h4>
            </div>
            <div className="card-body">
                {/* Review List */}
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                    {reviews.length === 0 ? (
                        <p className="text-center">No reviews yet.</p>
                    ) : (
                        reviews.map((review) => (
                            <div key={review.id} className="mb-3 border-bottom border-secondary pb-2">
                                <div className="d-flex justify-content-between">
                                    <strong>{review.customerName}</strong>
                                    <small className="text-muted">{review.reviewDate}</small>
                                </div>
                                <div>{renderStars(review.rating)}</div>
                                <p className="mt-1">{review.comment}</p>
                            </div>
                        ))
                    )}
                </div>

                <hr className="text-white" />

                {/* Add Review Form */}
                {customer ? (
                    <form onSubmit={addReview}>
                        <h5 className="mb-3">Add a Review</h5>
                        <div className="mb-3">
                            <label className="form-label">Your Rating:</label>
                            <select
                                className="form-select bg-dark text-white"
                                value={rating}
                                onChange={(e) => setRating(parseInt(e.target.value))}
                            >
                                <option value="5">5 - Excellent</option>
                                <option value="4">4 - Very Good</option>
                                <option value="3">3 - Good</option>
                                <option value="2">2 - Average</option>
                                <option value="1">1 - Poor</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Your Comment:</label>
                            <textarea
                                className="form-control bg-dark text-white"
                                rows="3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn bg-color custom-bg-text">
                            Submit
                        </button>
                    </form>
                ) : (
                    <div className="alert alert-warning">
                        Please login to leave a review.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewSection;
