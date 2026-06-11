import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [variantId, setVariantId] = useState(null);

  const [assignBooking, setAssignBooking] = useState(null);
  const [vehicleId, setVehicleId] = useState("");
  const [status, setStatus] = useState("");

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  /* ---------------- API ---------------- */

  const retrieveAllBookings = async () => {
    const res = await axios.get(
      "http://localhost:8080/api/booking/fetch/all"
    );
    setBookings(res.data?.bookings || []);
  };

  const retrieveVehiclesByVariant = async (variantId) => {
    if (!variantId) return;

    const res = await axios.get(
      `http://localhost:8080/api/vehicle/fetch/variant-wise?variantId=${variantId}`
    );
    setVehicles(res.data?.vehicles || []);
  };

  /* ---------------- EFFECTS ---------------- */

  useEffect(() => {
    retrieveAllBookings();
  }, []);

  useEffect(() => {
    if (variantId) {
      retrieveVehiclesByVariant(variantId);
    }
  }, [variantId]);

  /* ---------------- HANDLERS ---------------- */

  const assignBookingVehicle = (booking) => {
    if (!booking?.variant?.id) {
      toast.error("Variant information not found");
      return;
    }

    setAssignBooking(booking);
    setVariantId(booking.variant.id);
    setVehicleId("");
    setStatus("");
    setShowModal(true);
  };

  const updateCustomerBookingStatus = (e) => {
    e.preventDefault();

    if (!assignBooking || !status) {
      toast.error("Missing information");
      return;
    }

    if (status === "Approved" && !vehicleId) {
      toast.error("You must select a vehicle");
      return;
    }

    const payload =
      status === "Rejected"
        ? { bookingId: assignBooking.id, status }
        : { bookingId: assignBooking.id, status, vehicleId: Number(vehicleId) };

    fetch("http://localhost:8080/api/booking/update/assign/vehicle", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.responseMessage);
          setTimeout(() => window.location.reload(), 1000);
        } else {
          toast.error(res.responseMessage);
        }
      })
      .catch(() => toast.error("Server error"));
  };

  const viewCustomerBookingDetail = (booking) => {
    navigate("/customer/vehicle/booking/details", { state: booking });
  };

  const formatDateFromEpoch = (epoch) =>
    new Date(Number(epoch)).toLocaleString();

  /* ---------------- JSX ---------------- */

  return (
    <div className="mt-3">
      <ToastContainer />

      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg"
        style={{ height: "45rem" }}
      >
        <div className="card-header bg-color custom-bg-text text-center">
          <h2>All Bookings</h2>
        </div>

        <div className="card-body" style={{ overflowY: "auto" }}>
          <div className="table-responsive">
            <table className="table text-center text-color">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th>Variant</th>
                  <th>Name</th>
                  <th>Booking ID</th>
                  <th>Days</th>
                  <th>Price</th>
                  <th>Customer</th>
                  <th>Booking Time</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Vehicle</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody className="header-logo-color">
                {bookings.map((b) => {
                  return (
                    <tr key={b.id}>
                      <td>
                        <img
                          src={`http://localhost:8080/api/variant/${b.variant?.image}`}
                          alt="car"
                          className="img-fluid"
                          style={{ maxWidth: "90px" }}
                        />
                      </td>
                      <td><b>{b.variant?.name}</b></td>
                      <td><b>{b.bookingId}</b></td>
                      <td><b>{b.totalDay}</b></td>
                      <td><b>₹{b.totalPrice}</b></td>
                      <td>
                        <b>{b.customer?.firstName} {b.customer?.lastName}</b>
                      </td>
                      <td><b>{formatDateFromEpoch(b.bookingTime)}</b></td>
                      <td><b>{b.startDate}</b></td>
                      <td><b>{b.endDate}</b></td>
                      <td><b>{b.status}</b></td>
                      <td>
                        <b>{b.vehicle?.registrationNumber || "None"}</b>
                      </td>
                      <td><b>{b.payment ? "Paid" : "Pending"}</b></td>
                      <td>
                        <div className="d-flex flex-column align-items-center gap-2">
                          {b.status === "Pending" && (
                            <button
                              onClick={() => assignBookingVehicle(b)}
                              className="btn btn-sm bg-color custom-bg-text"
                            >
                              View
                            </button>
                          )}
                          <button
                            onClick={() => viewCustomerBookingDetail(b)}
                            className="btn btn-sm bg-color custom-bg-text"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ---------------- MODAL ---------------- */}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton className="bg-color custom-bg-text">
          <Modal.Title>Update Booking Status</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {assignBooking && (
            <form onSubmit={updateCustomerBookingStatus}>
              <div className="mb-3">
                <label className="form-label"><b>Booking ID</b></label>
                <input
                  className="form-control"
                  value={assignBooking.bookingId}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label className="form-label"><b>Status</b></label>
                <select
                  className="form-control"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              {status === "Approved" && (
                <div className="mb-3">
                  <label className="form-label"><b>Vehicle</b></label>
                  <select
                    className="form-control"
                    onChange={(e) => setVehicleId(e.target.value)}
                    value={vehicleId}
                  >
                    <option value="">Select Vehicle</option>
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.registrationNumber}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="d-flex justify-content-center">
                <button className="btn bg-color custom-bg-text">
                  Save
                </button>
              </div>
            </form>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AllBookings;
