package com.carrentalsystem.dto;

import java.time.LocalDate;

public class ReviewResponse {

    private int id;
    private String comment;
    private int rating;
    private LocalDate reviewDate;
    private String customerName; // Simplification for frontend
    private int customerId;
    private int carId; // Variant ID

    public ReviewResponse() {}

    public ReviewResponse(int id, String comment, int rating, LocalDate reviewDate, String customerName, int customerId, int carId) {
        this.id = id;
        this.comment = comment;
        this.rating = rating;
        this.reviewDate = reviewDate;
        this.customerName = customerName;
        this.customerId = customerId;
        this.carId = carId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public LocalDate getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(LocalDate reviewDate) {
        this.reviewDate = reviewDate;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public int getCarId() {
        return carId;
    }

    public void setCarId(int carId) {
        this.carId = carId;
    }

    // Builder pattern
    public static class ReviewResponseBuilder {
        private int id;
        private String comment;
        private int rating;
        private LocalDate reviewDate;
        private String customerName;
        private int customerId;
        private int carId;

        public ReviewResponseBuilder id(int id) {
            this.id = id;
            return this;
        }

        public ReviewResponseBuilder comment(String comment) {
            this.comment = comment;
            return this;
        }

        public ReviewResponseBuilder rating(int rating) {
            this.rating = rating;
            return this;
        }

        public ReviewResponseBuilder reviewDate(LocalDate reviewDate) {
            this.reviewDate = reviewDate;
            return this;
        }

        public ReviewResponseBuilder customerName(String customerName) {
            this.customerName = customerName;
            return this;
        }

        public ReviewResponseBuilder customerId(int customerId) {
            this.customerId = customerId;
            return this;
        }

        public ReviewResponseBuilder carId(int carId) {
            this.carId = carId;
            return this;
        }

        public ReviewResponse build() {
            return new ReviewResponse(id, comment, rating, reviewDate, customerName, customerId, carId);
        }
    }

    public static ReviewResponseBuilder builder() {
        return new ReviewResponseBuilder();
    }
}
