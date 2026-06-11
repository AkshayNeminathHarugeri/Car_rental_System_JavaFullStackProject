package com.carrentalsystem.entity;

import java.time.LocalDate;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "reviews")
public class Review {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; // PK

	private String comment;

	private int rating; // 1-5 scale

	private LocalDate reviewDate; // defaults to now

	@ManyToOne
	@JoinColumn(name = "variant_id") // Mapping "Car" to "Variant" in this system
	private Variant car;

	@ManyToOne
	@JoinColumn(name = "user_id") // Mapping "Customer" to "User"
	private User customer;

	public Review() {}

	public Review(int id, String comment, int rating, LocalDate reviewDate, Variant car, User customer) {
		this.id = id;
		this.comment = comment;
		this.rating = rating;
		this.reviewDate = reviewDate;
		this.car = car;
		this.customer = customer;
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

	public Variant getCar() {
		return car;
	}

	public void setCar(Variant car) {
		this.car = car;
	}

	public User getCustomer() {
		return customer;
	}

	public void setCustomer(User customer) {
		this.customer = customer;
	}

	// Builder pattern
	public static class ReviewBuilder {
		private int id;
		private String comment;
		private int rating;
		private LocalDate reviewDate;
		private Variant car;
		private User customer;

		public ReviewBuilder id(int id) {
			this.id = id;
			return this;
		}

		public ReviewBuilder comment(String comment) {
			this.comment = comment;
			return this;
		}

		public ReviewBuilder rating(int rating) {
			this.rating = rating;
			return this;
		}

		public ReviewBuilder reviewDate(LocalDate reviewDate) {
			this.reviewDate = reviewDate;
			return this;
		}

		public ReviewBuilder car(Variant car) {
			this.car = car;
			return this;
		}

		public ReviewBuilder customer(User customer) {
			this.customer = customer;
			return this;
		}

		public Review build() {
			return new Review(id, comment, rating, reviewDate, car, customer);
		}
	}

	public static ReviewBuilder builder() {
		return new ReviewBuilder();
	}
}
