import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import RoleNav from "./RoleNav";
import logo from "../images/e_logo.png";

const Header = () => {
  return (
    <Navbar expand="lg" className="custom-bg text-color shadow-sm">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            height="50"
            width="auto"
            className="d-inline-block align-top"
            alt="Logo"
          />
          <i>
            <b className="header-logo-color ms-2">Car Rental System</b>
          </i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="ms-auto">
            <RoleNav />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
