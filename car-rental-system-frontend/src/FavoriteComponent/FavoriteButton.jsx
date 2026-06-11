import { useState, useEffect } from "react";
import favoriteService from "./favoriteService";
import { toast } from "react-toastify";

const FavoriteButton = ({ carId }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const customer = JSON.parse(sessionStorage.getItem("active-customer"));

    useEffect(() => {
        if (carId && customer) {
            checkFavoriteStatus();
        }
    }, [carId, customer]);

    const checkFavoriteStatus = async () => {
        try {
            const response = await favoriteService.checkIfFavorited(carId, customer.id);
            setIsFavorite(response.data);
        } catch (error) {
            console.error("Error checking favorite status", error);
        }
    };

    const toggleFavorite = async () => {
        if (!customer) {
            toast.warning("You must be logged in to add to favorites.");
            return;
        }

        try {
            if (isFavorite) {
                await favoriteService.removeFromFavorites(carId, customer.id);
                setIsFavorite(false);
                toast.info("Removed from favorites.");
            } else {
                const request = {
                    carId: carId,
                    customerId: customer.id,
                };
                await favoriteService.addToFavorites(request);
                setIsFavorite(true);
                toast.success("Added to favorites!");
            }
        } catch (error) {
            console.error("Error toggling favorite", error);
            toast.error("An error occurred during the process.");
        }
    };

    return (
        <button
            onClick={toggleFavorite}
            className="btn btn-link text-decoration-none"
            style={{ fontSize: "1.5rem", padding: "0" }}
            title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
            {isFavorite ? (
                <span style={{ color: "red" }}>♥</span>
            ) : (
                <span style={{ color: "white" }}>♡</span>
            )}
        </button>
    );
};

export default FavoriteButton;
