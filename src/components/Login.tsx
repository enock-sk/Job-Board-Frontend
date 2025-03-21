import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "https://jobspark-backend.onrender.com/api/login/",
        {
          username,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setSuccess("Login successful! Redirecting to jobs...");
      setTimeout(() => navigate("/jobs"), 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <Card className="mx-auto shadow mt-5" style={{ maxWidth: "400px" }}>
      <Card.Body>
        <h2 className="text-center mb-4" style={{ color: "#007bff" }}>
          Login
        </h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            style={{ borderRadius: "25px" }}
          >
            Login
          </Button>
        </Form>
        <p className="text-center mt-3">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </Card.Body>
    </Card>
  );
};

export default Login;
