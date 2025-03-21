import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface LoginProps {
  setToken: (token: string) => void;
  setRole: (role: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken, setRole }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://jobspark-backend.onrender.com/api/login/",
        credentials
      );
      setToken(response.data.token);
      setRole(response.data.role);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      toast.success(response.data.message);
      navigate(response.data.role === "Employer" ? "/post-job" : "/");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div
      className="card p-4 mx-auto"
      style={{
        maxWidth: "400px",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        animation: "fadeIn 0.5s",
      }}
    >
      <h2
        className="text-center mb-4"
        style={{ color: "#2575fc", fontWeight: "bold" }}
      >
        Login
      </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
            style={{ borderRadius: "10px" }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
            style={{ borderRadius: "10px" }}
          />
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="w-100"
          style={{
            background: "linear-gradient(90deg, #6a11cb, #2575fc)",
            border: "none",
            borderRadius: "20px",
            padding: "10px",
          }}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
