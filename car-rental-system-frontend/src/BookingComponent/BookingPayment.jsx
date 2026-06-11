import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import creditcard from "../images/credit-card.png";
import { ToastContainer, toast } from "react-toastify";

const BookingPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  const [paymentRequest, setPaymentRequest] = useState({
    bookingId: null,
    nameOnCard: "",
    cardNo: "",
    cvv: "",
    expiryDate: "",
  });

  useEffect(() => {
    if (!booking) {
      navigate("/customer/bookings");
    }
  }, [booking, navigate]);

  useEffect(() => {
    if (booking) {
      setPaymentRequest((prev) => ({
        ...prev,
        bookingId: booking.bookingId ?? booking.id,
      }));
    }
  }, [booking]);

  const handleUserInput = (e) => {
    setPaymentRequest({
      ...paymentRequest,
      [e.target.name]: e.target.value,
    });
  };

  const payAndConfirmBooking = (e) => {
    e.preventDefault();

    if (!paymentRequest.bookingId) {
      toast.error("Booking information missing");
      return;
    }

    // --- VALIDATION START ---

    // 1. Card Number Validation (16 digits)
    const cardNoRegex = /^\d{16}$/;
    if (!cardNoRegex.test(paymentRequest.cardNo.replace(/\s/g, ""))) {
      toast.error("Invalid Card Number! Must be 16 digits.");
      return;
    }

    // 2. CVV Validation (3 digits)
    const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(paymentRequest.cvv)) {
      toast.error("Invalid CVV! Must be 3 digits.");
      return;
    }

    // 3. Expiry Date Validation (MM/YY)
    const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const expiryMatch = paymentRequest.expiryDate.match(expiryRegex);

    if (!expiryMatch) {
      toast.error("Invalid Expiry Date! Format: MM/YY");
      return;
    }

    // Check if expired
    const currentYear = new Date().getFullYear() % 100; // Last 2 digits
    const currentMonth = new Date().getMonth() + 1;
    const inputMonth = parseInt(expiryMatch[1]);
    const inputYear = parseInt(expiryMatch[2]);

    if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
      toast.error("Your card has expired!");
      return;
    }

    // --- VALIDATION END ---

    // FAKE PAYMENT SUCCESS
    toast.success("Payment Successful (Simulation)!", {
      position: "top-center",
      autoClose: 2000,
    });

    // Store fake payment status in localStorage
    const paidBookings = JSON.parse(localStorage.getItem("fake_paid_bookings") || "[]");
    if (!paidBookings.includes(paymentRequest.bookingId)) {
      paidBookings.push(paymentRequest.bookingId);
      localStorage.setItem("fake_paid_bookings", JSON.stringify(paidBookings));
    }

    setTimeout(() => {
      navigate("/customer/bookings");
    }, 2000);
  };

  // 🔴 booking yokken güvenli render
  if (!booking) {
    return (
      <div className="text-center mt-5">
        <h4>Payment information not found</h4>
      </div>
    );
  }

  return (
    <div className="d-flex justify-content-center mt-4">
      <div className="card form-card rounded-card custom-bg" style={{ maxWidth: "900px" }}>
        <div className="card-body header-logo-color">
          <h4 className="text-center">Payment Details</h4>

          <div className="row mt-4">
            <div className="col-sm-4">
              <img src={creditcard} className="img-fluid" alt="card" />
            </div>

            <div className="col-sm-6">
              <form className="row g-3" onSubmit={payAndConfirmBooking}>
                <input
                  type="text"
                  className="form-control"
                  name="nameOnCard"
                  placeholder="Name Surname"
                  onChange={handleUserInput}
                  value={paymentRequest.nameOnCard}
                  required
                />

                <input
                  type="text"
                  className="form-control"
                  name="cardNo"
                  placeholder="0000 0000 0000 0000"
                  onChange={handleUserInput}
                  value={paymentRequest.cardNo}
                  required
                />

                <input
                  type="text"
                  className="form-control"
                  name="expiryDate"
                  placeholder="01/24"
                  onChange={handleUserInput}
                  value={paymentRequest.expiryDate}
                  required
                />

                <input
                  type="number"
                  className="form-control"
                  name="cvv"
                  placeholder="123"
                  onChange={handleUserInput}
                  value={paymentRequest.cvv}
                  required
                />

                <button type="submit" className="btn bg-color custom-bg-text">
                  PAY ₹{booking.totalPrice}
                </button>

                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPayment;
