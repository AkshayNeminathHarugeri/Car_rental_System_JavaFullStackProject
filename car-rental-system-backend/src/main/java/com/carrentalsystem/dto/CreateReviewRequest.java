package com.carrentalsystem.dto;

public class CreateReviewRequest {

    private String comment;
    private int rating;
    private int carId; // Variant ID
    private int customerId; // User ID

    public CreateReviewRequest() {}

    public CreateReviewRequest(String comment, int rating, int carId, int customerId) {
        this.comment = comment;
        this.rating = rating;
        this.carId = carId;
        this.customerId = customerId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public int getCarId() {
        return carId;
    }

    public void setCarId(int carId) {
        this.carId = carId;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    // Builder pattern
    public static class CreateReviewRequestBuilder {
        private String comment;
        private int rating;
        private int carId;
        private int customerId;

        public CreateReviewRequestBuilder comment(String comment) {
            this.comment = comment;
            return this;
        }

        public CreateReviewRequestBuilder rating(int rating) {
            this.rating = rating;
            return this;
        }

        public CreateReviewRequestBuilder carId(int carId) {
            this.carId = carId;
            return this;
        }

        public CreateReviewRequestBuilder customerId(int customerId) {
            this.customerId = customerId;
            return this;
        }

        public CreateReviewRequest build() {
            return new CreateReviewRequest(comment, rating, carId, customerId);
        }
    }

    public static CreateReviewRequestBuilder builder() {
        return new CreateReviewRequestBuilder();
    }
}
