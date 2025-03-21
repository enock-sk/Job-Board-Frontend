import React, { useState, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  setToken: Dispatch<SetStateAction<string | null>>;
  setRole: Dispatch<SetStateAction<string | null>>;
}

const Register: React.FC<RegisterProps> = ({ setToken, setRole }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmployer, setIsEmployer] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        "https://jobspark-backend.onrender.com/api/register/",
        {
          username,
          email,
          password,
          is_employer: isEmployer,
          company_name: isEmployer ? companyName : "",
        }
      );
      const token = response.data.token;
      const user = response.data.user;
      setToken(token);
      setRole(isEmployer ? "employer" : "jobseeker");
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", isEmployer ? "employer" : "jobseeker");
      setSuccess("Registration successful! Redirecting to jobs...");
      setTimeout(() => navigate("/jobs"), 2000);
    } catch (err: any) {
      setError(
        err.response?.data?.username?.[0] ||
          err.response?.data?.email?.[0] ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <Card className="mx-auto shadow" style={{ maxWidth: "400px" }}>
      <Card.Body>
        <h2 className="text-center mb-4" style={{ color: "#007bff" }}>
          Sign Up
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
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
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
              minLength={8}
            />
            <Form.Text className="text-muted">At least 8 characters</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="I am an employer"
              checked={isEmployer}
              onChange={(e) => setIsEmployer(e.target.checked)}
            />
          </Form.Group>
          {isEmployer && (
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                required
              />
            </Form.Group>
          )}
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            style={{ borderRadius: "25px" }}
          >
            Register
          </Button>
        </Form>
        <p className="text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </p>
      </Card.Body>
    </Card>
  );
};

export default Register;
