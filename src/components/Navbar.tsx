import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface NavbarProps {
  token: string;
  setToken: (token: string) => void;
  role: string;
  setRole: (role: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ token, setToken, role, setRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken("");
    setRole("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        background: "linear-gradient(90deg, #6a11cb, #2575fc)",
        position: "sticky",
        top: "0",
        zIndex: 1000,
      }}
    >
      <div className="container">
        <Link className="navbar-brand text-white fw-bold" to="/">
          JobSpark
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: "rgba(255, 255, 255, 0.5)" }}
        >
          <span
            className="navbar-toggler-icon"
            style={{ filter: "invert(1)" }}
          ></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto">
            <Link
              className="nav-link text-white fw-semibold py-2 py-lg-0"
              to="/"
            >
              Browse Jobs
            </Link>
            {token ? (
              <>
                {role === "Employer" && (
                  <Link
                    className="nav-link text-white fw-semibold py-2 py-lg-0"
                    to="/post-job"
                  >
                    Post a Job
                  </Link>
                )}
                <Link
                  className="nav-link text-white fw-semibold py-2 py-lg-0"
                  to="/profile"
                >
                  Profile
                </Link>
                <button
                  className="btn btn-outline-light fw-semibold ms-2 my-2 my-lg-0"
                  onClick={handleLogout}
                  style={{ borderRadius: "20px", padding: "6px 15px" }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  className="nav-link text-white fw-semibold py-2 py-lg-0"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="nav-link text-white fw-semibold py-2 py-lg-0"
                  to="/register"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
