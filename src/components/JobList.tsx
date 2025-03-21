import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Form } from "react-bootstrap";
import { Alert } from "react-bootstrap";

interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
  job_type: string;
  user?: { id: number; username: string };
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
        : "https://jobspark-backend.onrender.com/api/jobs/";
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<Job[]>(url, {
          headers: token ? { Authorization: `Token ${token}` } : {},
        });
        setJobs(response.data || []);
        setError(null);
      } catch (err) {
        setError("Failed to load jobs.");
        setJobs([]);
      }
    };
    fetchJobs();
  }, [filter]);

  return (
    <div>
      <h1 className="text-center mb-4" style={{ color: "#007bff" }}>
        Job Listings
      </h1>
      <Form.Select
        className="mb-4 w-50 mx-auto"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="">All Jobs</option>
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
        <option value="Internship">Internship</option>
      </Form.Select>
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}
      <div className="row">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.id} className="col-md-4 mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {job.company} - {job.location}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Type:</strong> {job.job_type}
                  </Card.Text>
                  <Card.Text>
                    <strong>Salary:</strong> {job.salary || "N/A"}
                  </Card.Text>
                  <Card.Text>{job.description}</Card.Text>
                  <Button variant="outline-primary">Apply</Button>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p className="text-center">No jobs available.</p>
        )}
      </div>
    </div>
  );
};

export default JobList;
