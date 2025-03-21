import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface RegisterProps {
  setToken: (token: string) => void;
  setRole: (role: string) => void;
}

const Register: React.FC<RegisterProps> = ({ setToken, setRole }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "JobSeeker",
  });
  const navigate = useNavigate();

  // Correctly typing the event to accept all FormControl elements
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/register/",
        formData
      );
      setToken(response.data.token);
      setRole(response.data.role);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      toast.success(response.data.message);
      navigate(response.data.role === "Employer" ? "/post-job" : "/");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Registration failed");
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
        Register
      </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
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
            value={formData.password}
            onChange={handleChange}
            required
            style={{ borderRadius: "10px" }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ borderRadius: "10px" }}
          >
            <option value="JobSeeker">Job Seeker</option>
            <option value="Employer">Employer</option>
          </Form.Select>
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
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
