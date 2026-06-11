import { Link, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHeader = () => {
  let navigate = useNavigate();

  const adminLogout = (e) => {
    e.preventDefault();
    toast.success("Logged out successfully", {
      position: "top-center",
      autoClose: 1000,
    });
    sessionStorage.removeItem("active-admin");
    sessionStorage.removeItem("admin-jwtToken");

    setTimeout(() => {
      window.location.href = "/home";
    }, 1000);
  };

  return (
    <>
      <Nav.Link as={Link} to="/user/admin/register" className="nav-link active">
        <b className="text-color">Admin Register</b>
      </Nav.Link>
      <Nav.Link as={Link} to="/admin/company/add" className="nav-link active">
        <b className="text-color">Add Company</b>
      </Nav.Link>
      <Nav.Link as={Link} to="/admin/variant/add" className="nav-link active">
        <b className="text-color">Add Variant</b>
      </Nav.Link>
      <Nav.Link as={Link} to="/admin/variant/all" className="nav-link active">
        <b className="text-color">Variants</b>
      </Nav.Link>
      <Nav.Link as={Link} to="/admin/customer/bookings" className="nav-link active">
        <b className="text-color">Bookings</b>
      </Nav.Link>
      <Nav.Link className="nav-link active" style={{ cursor: "pointer" }} onClick={adminLogout}>
        <b className="text-color">Logout</b>
      </Nav.Link>
      <ToastContainer />
    </>
  );
};

export default AdminHeader;
