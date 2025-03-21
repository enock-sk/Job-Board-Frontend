import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Form, Pagination } from "react-bootstrap";

interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  salary: string;
  job_type: string;
}

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchJobs = async () => {
      const url = filter
        ? `http://localhost:8000/api/jobs/?job_type=${filter}&page=${page}`
        : `http://localhost:8000/api/jobs/?page=${page}`;
      try {
        const response = await axios.get<{ results: Job[]; count: number }>(
          url
        );
        setJobs(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10));
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, [filter, page]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

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
        onChange={(e) => {
          setFilter(e.target.value);
          setPage(1);
        }}
        style={{ borderRadius: "20px", padding: "10px" }}
      >
        <option value="">All Opportunities</option>
        <option value="Full-Time">Full-Time Jobs</option>
        <option value="Part-Time">Part-Time Jobs</option>
        <option value="Internship">Internships</option>
      </Form.Select>
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
                e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
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
      <Pagination className="justify-content-center mt-4">
        <Pagination.Prev
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        />
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i + 1}
            active={i + 1 === page}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default JobList;
