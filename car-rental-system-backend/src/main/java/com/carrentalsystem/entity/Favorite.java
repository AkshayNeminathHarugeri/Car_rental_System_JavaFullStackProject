package com.carrentalsystem.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "favorites")
public class Favorite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id; // PK

    @ManyToOne
    @JoinColumn(name = "variant_id") // Mapping "Car" to "Variant"
    private Variant car;

    @ManyToOne
    @JoinColumn(name = "user_id") // Mapping "Customer" to "User"
    private User customer;

    public Favorite() {}

    public Favorite(int id, Variant car, User customer) {
        this.id = id;
        this.car = car;
        this.customer = customer;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
    public static class FavoriteBuilder {
        private int id;
        private Variant car;
        private User customer;

        public FavoriteBuilder id(int id) {
            this.id = id;
            return this;
        }

        public FavoriteBuilder car(Variant car) {
            this.car = car;
            return this;
        }

        public FavoriteBuilder customer(User customer) {
            this.customer = customer;
            return this;
        }

        public Favorite build() {
            return new Favorite(id, car, customer);
        }
    }

    public static FavoriteBuilder builder() {
        return new FavoriteBuilder();
    }
}
