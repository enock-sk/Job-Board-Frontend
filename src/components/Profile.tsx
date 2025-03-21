import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface User {
  id: number;
  username: string;
}

interface ProfileData {
  user: User;
  role: string;
}

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  job_type: string;
}

interface ProfileProps {
  token: string;
  role: string;
}

const Profile: React.FC<ProfileProps> = ({ token, role }) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get<{ profile: ProfileData; jobs: Job[] }>(
          "http://localhost:8000/api/profile/",
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        setProfile(response.data.profile);
        setJobs(response.data.jobs);
      } catch (error: any) {
        toast.error("Failed to load profile");
        navigate("/login");
      }
    };
    if (token) fetchProfile();
  }, [token, navigate]);

  if (!token) {
    return (
      <div className="text-center mt-5">
        <h3 style={{ color: "#2575fc" }}>
          Please log in to view your profile.
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

  return (
    <div>
      <h2
        className="text-center mb-4"
        style={{ color: "#2575fc", fontWeight: "bold" }}
      >
        Your Profile
      </h2>
      {profile && (
        <Card
          className="mb-4 mx-auto"
          style={{
            maxWidth: "600px",
            borderRadius: "20px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Card.Body>
            <Card.Title>Username: {profile.user.username}</Card.Title>
            <Card.Text>
              <strong>Role:</strong> {profile.role}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
      {role === "Employer" && (
        <>
          <h3 className="mb-3" style={{ color: "#6a11cb" }}>
            Your Posted Jobs
          </h3>
          <div className="row">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job.id} className="col-md-6 mb-4">
                  <Card className="shadow" style={{ borderRadius: "15px" }}>
                    <Card.Body>
                      <Card.Title>{job.title}</Card.Title>
                      <Card.Text>
                        {job.company} - {job.location}
                      </Card.Text>
                      <Card.Text>
                        <strong>Type:</strong> {job.job_type}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              <p className="text-center">No jobs posted yet.</p>
            )}
          </div>
          <div className="text-center">
            <Button
              variant="primary"
              onClick={() => navigate("/post-job")}
              style={{ borderRadius: "20px" }}
            >
              Post a New Job
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
