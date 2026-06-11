import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeaderCustomer = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("active-customer"));

  const userLogout = (e) => {
    e.preventDefault();
    toast.success("Logged out successfully", {
      position: "top-center",
      autoClose: 1000,
    });

    sessionStorage.removeItem("active-customer");
    sessionStorage.removeItem("customer-jwtToken");

    setTimeout(() => {
      navigate("/", { replace: true });
      window.location.reload();
    }, 1000);
  };

  const viewProfile = () => {
    navigate("/user/profile/detail", { state: user });
  };

  return (
    <>
      <Nav.Link as={Link} to="/customer/bookings" className="nav-link active">
        <b className="text-color">My Bookings</b>
      </Nav.Link>

      <Nav.Link as={Link} to="/customer/favorites" className="nav-link active">
        <b className="text-color">My Favorites</b>
      </Nav.Link>

      <Nav.Link className="nav-link active" style={{ cursor: "pointer" }} onClick={viewProfile}>
        <b className="text-color">My Profile</b>
      </Nav.Link>

      <Nav.Link className="nav-link active" style={{ cursor: "pointer" }} onClick={userLogout}>
        <b className="text-color">Logout</b>
      </Nav.Link>

      <ToastContainer />
    </>
  );
};

export default HeaderCustomer;
