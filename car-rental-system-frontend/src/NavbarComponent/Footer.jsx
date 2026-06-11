import { Link } from "react-router-dom";
const Footer = () => {
  // Check user login status
  const customer = JSON.parse(sessionStorage.getItem("active-customer"));
  const admin = JSON.parse(sessionStorage.getItem("active-admin"));
  const isLoggedIn = customer !== null || admin !== null;

  return (
    <div>
      <div className="container my-5">
        <footer className="text-center text-lg-start">
          <div className="container-fluid p-4 pb-0">
            <section className="">
              <div className="row">
                <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h4 className="text-uppercase text-color">
                    <i>CAR RENTAL SYSTEM</i>
                  </h4>

                  <p className="header-logo-color">
                    Hello, I'm Akshay. We aimed to provide you with an easy, reliable, and user-friendly car rental experience. Enjoy exploring, start your journey with confidence. Welcome!
                  </p>
                </div>

              </div>
            </section>

            <hr className="mb-4" />

            {/* Only show Login button to guests */}
            {!isLoggedIn && (
              <section className="">
                <p className="d-flex justify-content-center align-items-center">
                  <span className="me-3 custom-bg-text">
                    <b>Login from here</b>
                  </span>
                  <Link to="/user/login" className="active">
                    <button
                      type="button"
                      className="btn btn-outline-light btn-rounded bg-color custom-bg-text"
                    >
                      <b> Login</b>
                    </button>
                  </Link>
                </p>
              </section>
            )}

            <hr className="mb-4" />
          </div>

          <div className="text-center text-color">

          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
