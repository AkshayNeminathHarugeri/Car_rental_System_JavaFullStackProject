import { Carousel as BootstrapCarousel } from "react-bootstrap";
import carousel1 from "../images/carousel_1.png";
import carousel2 from "../images/carousel_2.png";
import carousel3 from "../images/carousel_3.png";

const Carousel = () => {
  return (
    <BootstrapCarousel fade className="shadow-lg mb-4 mt-2">
      <BootstrapCarousel.Item style={{ height: "500px" }}>
        <img
          className="d-block w-100 h-100 object-fit-cover"
          src={carousel1}
          alt="Luxury Car"
        />
        <BootstrapCarousel.Caption
          style={{
            background: "rgba(0,0,0,0.5)",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <h2 className="fw-bold text-uppercase">Rent A Car</h2>
          <p className="fs-5">Your Dream Car is One Click Away</p>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>

      <BootstrapCarousel.Item style={{ height: "500px" }}>
        <img
          className="d-block w-100 h-100 object-fit-cover"
          src={carousel2}
          alt="Adventure SUV"
        />
        <BootstrapCarousel.Caption
          style={{
            background: "rgba(0,0,0,0.5)",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <h2 className="fw-bold text-uppercase">Drive Your Adventure</h2>
          <p className="fs-5">Explore the World with Our Premium Fleet</p>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>

      <BootstrapCarousel.Item style={{ height: "500px" }}>
        <img
          className="d-block w-100 h-100 object-fit-cover"
          src={carousel3}
          alt="Sports Car"
        />
        <BootstrapCarousel.Caption
          style={{
            background: "rgba(0,0,0,0.5)",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <h2 className="fw-bold text-uppercase">Premium Car Rentals</h2>
          <p className="fs-5">Affordable Luxury for Every Occasion</p>
        </BootstrapCarousel.Caption>
      </BootstrapCarousel.Item>
    </BootstrapCarousel>
  );
};

export default Carousel;
