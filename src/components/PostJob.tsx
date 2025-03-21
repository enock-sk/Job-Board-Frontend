import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface PostJobProps {
  token: string;
  role: string;
}

const PostJob: React.FC<PostJobProps> = ({ token, role }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    job_type: "Full-Time",
  });
  const navigate = useNavigate();

  if (role !== "Employer") {
    return (
      <div className="text-center mt-5">
        <h3 style={{ color: "#2575fc" }}>
          Only Employers can post jobs. Please log in as an Employer.
        </h3>
        <Button
          variant="primary"
          onClick={() => navigate("/login")}
          style={{ borderRadius: "20px" }}
        >
          Login
        </Button>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://jobspark-backend.onrender.com/api/post-job/",
        formData,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      toast.success(response.data.message);
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to post job");
      if (error.response?.status === 403) navigate("/login");
    }
  };

  return (
    <div
      className="card p-4 mx-auto"
      style={{
        maxWidth: "600px",
        borderRadius: "20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        animation: "fadeIn 0.5s",
      }}
    >
      <h2
        className="text-center mb-4"
        style={{ color: "#2575fc", fontWeight: "bold" }}
      >
        Post a Job Opportunity
      </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Job Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ borderRadius: "10px" }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            style={{ borderRadius: "10px" }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            style={{ borderRadius: "10px" }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            style={{ borderRadius: "10px" }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Salary (optional)</Form.Label>
          <Form.Control
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            style={{ borderRadius: "10px" }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Job Type</Form.Label>
          <Form.Select
            name="job_type"
            value={formData.job_type}
            onChange={handleChange}
            style={{ borderRadius: "10px" }}
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Internship">Internship</option>
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
          Post Job
        </Button>
      </Form>
    </div>
  );
};

export default PostJob;
