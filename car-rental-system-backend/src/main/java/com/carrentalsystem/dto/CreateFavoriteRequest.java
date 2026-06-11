package com.carrentalsystem.dto;

public class CreateFavoriteRequest {

    private int carId; // Variant ID

    private int customerId; // User ID

    public CreateFavoriteRequest() {}

    public CreateFavoriteRequest(int carId, int customerId) {
        this.carId = carId;
        this.customerId = customerId;
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
    public static class CreateFavoriteRequestBuilder {
        private int carId;
        private int customerId;

        public CreateFavoriteRequestBuilder carId(int carId) {
            this.carId = carId;
            return this;
        }

        public CreateFavoriteRequestBuilder customerId(int customerId) {
            this.customerId = customerId;
            return this;
        }

        public CreateFavoriteRequest build() {
            return new CreateFavoriteRequest(carId, customerId);
        }
    }

    public static CreateFavoriteRequestBuilder builder() {
        return new CreateFavoriteRequestBuilder();
    }
}
