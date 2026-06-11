package com.carrentalsystem.entity;

import java.math.BigDecimal;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
public class Booking {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String bookingId;

	private String startDate; // local date toString

	private String endDate;

	private String bookingTime; // in millis

	private int totalDay;

	private BigDecimal totalPrice;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User customer;

	@ManyToOne
	@JoinColumn(name = "vehicle_id")
	private Vehicle vehicle;

	@ManyToOne
	@JoinColumn(name = "variant_id")
	private Variant variant;

	@OneToOne
	@JoinColumn(name = "payment_id")
	private Payment payment;

	private String status;

	public Booking() {}

	public Booking(int id, String bookingId, String startDate, String endDate, String bookingTime, int totalDay, BigDecimal totalPrice, User customer, Vehicle vehicle, Variant variant, Payment payment, String status) {
		this.id = id;
		this.bookingId = bookingId;
		this.startDate = startDate;
		this.endDate = endDate;
		this.bookingTime = bookingTime;
		this.totalDay = totalDay;
		this.totalPrice = totalPrice;
		this.customer = customer;
		this.vehicle = vehicle;
		this.variant = variant;
		this.payment = payment;
		this.status = status;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBookingId() {
		return bookingId;
	}

	public void setBookingId(String bookingId) {
		this.bookingId = bookingId;
	}

	public Payment getPayment() {
		return payment;
	}

	public void setPayment(Payment payment) {
		this.payment = payment;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public int getTotalDay() {
		return totalDay;
	}

	public void setTotalDay(int totalDay) {
		this.totalDay = totalDay;
	}

	public BigDecimal getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(BigDecimal totalPrice) {
		this.totalPrice = totalPrice;
	}

	public User getCustomer() {
		return customer;
	}

	public void setCustomer(User customer) {
		this.customer = customer;
	}

	public Vehicle getVehicle() {
		return vehicle;
	}

	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getBookingTime() {
		return bookingTime;
	}

	public void setBookingTime(String bookingTime) {
		this.bookingTime = bookingTime;
	}

	public Variant getVariant() {
		return variant;
	}

	public void setVariant(Variant variant) {
		this.variant = variant;
	}

	// Builder pattern
	public static class BookingBuilder {
		private int id;
		private String bookingId;
		private String startDate;
		private String endDate;
		private String bookingTime;
		private int totalDay;
		private BigDecimal totalPrice;
		private User customer;
		private Vehicle vehicle;
		private Variant variant;
		private Payment payment;
		private String status;

		public BookingBuilder id(int id) {
			this.id = id;
			return this;
		}

		public BookingBuilder bookingId(String bookingId) {
			this.bookingId = bookingId;
			return this;
		}

		public BookingBuilder startDate(String startDate) {
			this.startDate = startDate;
			return this;
		}

		public BookingBuilder endDate(String endDate) {
			this.endDate = endDate;
			return this;
		}

		public BookingBuilder bookingTime(String bookingTime) {
			this.bookingTime = bookingTime;
			return this;
		}

		public BookingBuilder totalDay(int totalDay) {
			this.totalDay = totalDay;
			return this;
		}

		public BookingBuilder totalPrice(BigDecimal totalPrice) {
			this.totalPrice = totalPrice;
			return this;
		}

		public BookingBuilder customer(User customer) {
			this.customer = customer;
			return this;
		}

		public BookingBuilder vehicle(Vehicle vehicle) {
			this.vehicle = vehicle;
			return this;
		}

		public BookingBuilder variant(Variant variant) {
			this.variant = variant;
			return this;
		}

		public BookingBuilder payment(Payment payment) {
			this.payment = payment;
			return this;
		}

		public BookingBuilder status(String status) {
			this.status = status;
			return this;
		}

		public Booking build() {
			return new Booking(id, bookingId, startDate, endDate, bookingTime, totalDay, totalPrice, customer, vehicle, variant, payment, status);
		}
	}

	public static BookingBuilder builder() {
		return new BookingBuilder();
	}
}
