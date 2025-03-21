import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer
      className="text-white py-5 mt-5"
      style={{ background: "linear-gradient(90deg, #6a11cb, #2575fc)" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">JobSpark</h5>
            <p className="small">
              Connecting talent with opportunity. Your career starts here.
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white text-decoration-none">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white text-decoration-none">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold">Contact Us</h5>
            <p className="small mb-1">Email: support@jobspark.com</p>
            <p className="small mb-0">Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <hr className="bg-light" />
        <div className="text-center">
          <p className="mb-0 small">
            © {new Date().getFullYear()} JobSpark. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
