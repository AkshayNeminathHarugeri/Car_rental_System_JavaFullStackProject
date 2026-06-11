import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

const NormalHeader = () => {
  return (
    <>
      <Nav.Link as={Link} to="/user/customer/register" className="nav-link active">
        <b className="text-color">Register</b>
      </Nav.Link>
      <Nav.Link as={Link} to="/user/login" className="nav-link active">
        <b className="text-color">Login</b>
      </Nav.Link>
    </>
  );
};

export default NormalHeader;
