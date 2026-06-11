import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";

const ViewCustomerBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state;

  useEffect(() => {
    if (!booking) {
      navigate("/admin/bookings");
    }
  }, [booking, navigate]);

  if (!booking) {
    return (
      <div className="text-center mt-5">
        <h4>Booking information not found</h4>
      </div>
    );
  }

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    return date.toLocaleString();
  };

  return (
    <div className="container-fluid">
      <div className="row">

        <div className="col-sm-4 mt-2">
          <div className="card form-card custom-bg">
            <img
              src={API_BASE_URL + `/variant/${booking.variant?.image}`}
              className="card-img-top rounded img-fluid"
              alt="car"
            />
          </div>
        </div>

        <div className="col-sm-4 mt-2">
          <div className="card form-card custom-bg shadow-lg">
            <div className="card-header bg-color custom-bg-text">
              <h3 className="card-title">{booking.variant?.name}</h3>
            </div>

            <div className="card-body text-color">
              <h5>Company : <span className="header-logo-color">{booking.variant?.company?.name}</span></h5>
              <h5>Model Number : <span className="header-logo-color">{booking.variant?.modelNumber}</span></h5>
              <h5>Fuel Type : <span className="header-logo-color">{booking.variant?.fuelType}</span></h5>
              <h5>Daily Price : <span className="header-logo-color">₹{booking.variant?.pricePerDay}</span></h5>
              <h5>Vehicle Plate : <span className="header-logo-color">{booking.vehicle?.registrationNumber || "None"}</span></h5>
              <h5>Booking Status : <span className="header-logo-color">
                {booking.status}
              </span></h5>
            </div>
          </div>
        </div>

        <div className="col-sm-4 mt-2">
          <div className="card form-card custom-bg shadow-lg">
            <div className="card-header bg-color custom-bg-text text-center">
              <h3>Booking Details</h3>
            </div>

            <div className="card-body text-color">
              <h5>Booking ID : <span className="header-logo-color">{booking.bookingId}</span></h5>
              <h5>Booking Date : <span className="header-logo-color">{formatDateFromEpoch(booking.bookingTime)}</span></h5>
              <h5>Start Date : <span className="header-logo-color">{booking.startDate}</span></h5>
              <h5>End Date : <span className="header-logo-color">{booking.endDate}</span></h5>
              <h5>Total Amount : <span className="header-logo-color">₹{booking.totalPrice}</span></h5>
              <h5>Payment Status : <span className="header-logo-color">{booking.payment ? "Paid" : "Pending"}</span></h5>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-3">

        <div className="col-sm-4">
          <div className="card form-card custom-bg shadow-lg">
            <div className="card-header bg-color custom-bg-text">
              <h3>Customer Details</h3>
            </div>

            <div className="card-body text-color">
              <h5>Name : <span className="header-logo-color">{booking.customer?.firstName} {booking.customer?.lastName}</span></h5>
              <h5>Phone : <span className="header-logo-color">{booking.customer?.phoneNo}</span></h5>
              <h5>Email : <span className="header-logo-color">{booking.customer?.emailId}</span></h5>
              <h5>
                Address :
                <span className="header-logo-color">
                  {booking.customer?.address
                    ? `${booking.customer.address.street} ${booking.customer.address.city} ${booking.customer.address.pincode}`
                    : "No info"}
                </span>
              </h5>
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="card form-card custom-bg shadow-lg">
            <div className="card-header bg-color custom-bg-text">
              <h3>Driving License Details</h3>
            </div>

            <div className="card-body text-color">
              <h5>License Number : <span className="header-logo-color">{booking.customer?.license?.licenseNumber || "None"}</span></h5>
              <h5>Expiration Date : <span className="header-logo-color">{booking.customer?.license?.expirationDate || "None"}</span></h5>

              {booking.customer?.license?.licensePic && (
                <div className="d-flex justify-content-center mt-3">
                  <img
                    src={API_BASE_URL + `/user/${booking.customer.license.licensePic}`}
                    className="img-fluid rounded"
                    style={{ maxWidth: "250px" }}
                    alt="license"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="card form-card custom-bg shadow-lg">
            <div className="card-header bg-color custom-bg-text text-center">
              <h3>Payment Details</h3>
            </div>

            <div className="card-body text-color">
              <h5>Payment Status : <span className="header-logo-color">{booking.payment ? "Paid" : "Pending"}</span></h5>
              <h5>Transaction Date : <span className="header-logo-color">{booking.payment?.transactionTime ? formatDateFromEpoch(booking.payment.transactionTime) : "Pending"}</span></h5>
              <h5>Transaction Ref ID : <span className="header-logo-color">{booking.payment?.transactionRefId || "Pending"}</span></h5>
              <h5>Paid Amount : <span className="header-logo-color">₹{booking.payment ? booking.totalPrice : "0.0"}</span></h5>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewCustomerBooking;
