import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Form, Alert } from "react-bootstrap";

interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
  job_type: string;
  user?: { id: number; username: string }; // Optional user field
  is_active?: boolean; // Optional fields from response
  created_at?: string;
  updated_at?: string;
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const url = filter
        ? `https://jobspark-backend.onrender.com/api/jobs/?job_type=${filter}`
        : `https://jobspark-backend.onrender.com/api/jobs/`;
      try {
        const response = await axios.get<Job[]>(url); // Expect flat array
        setJobs(response.data || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setError("Failed to load jobs. Please try again later.");
        setJobs([]);
      }
    };
    fetchJobs();
  }, [filter]);

  return (
    <div>
      <h1
        className="text-center mb-4"
        style={{
          color: "#2575fc",
          fontWeight: "bold",
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        Discover Your Next Adventure
      </h1>
      <Form.Select
        className="mb-5 w-50 mx-auto shadow-sm"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ borderRadius: "20px", padding: "10px" }}
      >
        <option value="">All Opportunities</option>
        <option value="Full-Time">Full-Time Jobs</option>
        <option value="Part-Time">Part-Time Jobs</option>
        <option value="Internship">Internships</option>
      </Form.Select>

      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}

      {jobs.length > 0 ? (
        <div className="row">
          {jobs.map((job) => (
            <div key={job.id} className="col-md-4 mb-4">
              <Card
                className="shadow h-100"
                style={{
                  borderRadius: "15px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  border: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 20px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0,0,0,0.1)";
                }}
              >
                <Card.Body>
                  <Card.Title style={{ color: "#6a11cb", fontWeight: "600" }}>
                    {job.title}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {job.company} - {job.location}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Type:</strong> {job.job_type}
                  </Card.Text>
                  <Card.Text>
                    <strong>Salary:</strong> {job.salary || "Not specified"}
                  </Card.Text>
                  <Card.Text className="text-truncate">
                    {job.description}
                  </Card.Text>
                  <Button
                    variant="outline-primary"
                    style={{ borderRadius: "20px", padding: "8px 20px" }}
                  >
                    Apply Now
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No jobs available.</p>
      )}
    </div>
  );
};

export default JobList;
