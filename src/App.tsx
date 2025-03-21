import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import JobList from "./components/JobList";
import PostJob from "./components/PostJob";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );
  const [role, setRole] = useState<string>(localStorage.getItem("role") || "");

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar
          token={token}
          setToken={setToken}
          role={role}
          setRole={setRole}
        />
        <main className="flex-grow-1">
          <div className="container mt-5">
            <Routes>
              <Route path="/" element={<JobList />} />
              <Route
                path="/post-job"
                element={<PostJob token={token} role={role} />}
              />
              <Route
                path="/login"
                element={<Login setToken={setToken} setRole={setRole} />}
              />
              <Route
                path="/register"
                element={<Register setToken={setToken} setRole={setRole} />}
              />
              <Route
                path="/profile"
                element={<Profile token={token} role={role} />}
              />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
};

export default App;
