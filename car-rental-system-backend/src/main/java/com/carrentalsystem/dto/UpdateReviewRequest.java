package com.carrentalsystem.dto;

public class UpdateReviewRequest {

    private int id; // Review ID
    private String comment;
    private int rating;

    public UpdateReviewRequest() {}

    public UpdateReviewRequest(int id, String comment, int rating) {
        this.id = id;
        this.comment = comment;
        this.rating = rating;
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

    // Builder pattern
    public static class UpdateReviewRequestBuilder {
        private int id;
        private String comment;
        private int rating;

        public UpdateReviewRequestBuilder id(int id) {
            this.id = id;
            return this;
        }

        public UpdateReviewRequestBuilder comment(String comment) {
            this.comment = comment;
            return this;
        }

        public UpdateReviewRequestBuilder rating(int rating) {
            this.rating = rating;
            return this;
        }

        public UpdateReviewRequest build() {
            return new UpdateReviewRequest(id, comment, rating);
        }
    }

    public static UpdateReviewRequestBuilder builder() {
        return new UpdateReviewRequestBuilder();
    }
}
