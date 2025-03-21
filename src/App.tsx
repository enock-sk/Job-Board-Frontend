import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import JobList from "./components/JobList";
import Register from "./components/Register";
import Login from "./components/Login";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null
  );
  const [role, setRole] = useState<string | null>(
    localStorage.getItem("role") || null
  );

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        {/* Top Navbar */}
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
          <Container>
            <Navbar.Brand as={Link} to="/">
              JobSpark
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/jobs">
                  Jobs
                </Nav.Link>
                {!token ? (
                  <>
                    <Nav.Link as={Link} to="/register">
                      Register
                    </Nav.Link>
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                  </>
                ) : (
                  <Nav.Link
                    as={Link}
                    to="/"
                    onClick={() => {
                      setToken(null);
                      setRole(null);
                      localStorage.clear();
                    }}
                  >
                    Logout
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Main Content */}
        <Container className="mt-5 flex-grow-1">
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="/jobs" element={<JobList />} />
            <Route
              path="/register"
              element={<Register setToken={setToken} setRole={setRole} />}
            />
            <Route
              path="/login"
              element={<Login setToken={setToken} setRole={setRole} />}
            />
          </Routes>
        </Container>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
