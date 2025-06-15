import React, { useEffect, useState } from "react";
import { Spinner, Alert, Button } from "react-bootstrap";
import { fetchJobs, deleteJob } from "../../api/jobs";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/JobsDelete.css"; // Import the beautiful CSS file

const JobsDelete = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
        setError(null);
      } catch {
        setError("Failed to load jobs. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      setDeletingId(id);
      await deleteJob(id);
      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch {
      alert("Failed to delete the job. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading)
    return (
      <div className="jobs-loading">
        <div className="jobs-loading-container">
          <div className="jobs-loading-spinner"></div>
          <p className="jobs-loading-text">Loading jobs...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="jobs-error-container">
        <div className="jobs-error-card">
          <div className="jobs-error-icon">⚠️</div>
          <h3 className="jobs-error-title">Error</h3>
          <p className="jobs-error-message">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="jobs-list-portal">
      {/* Header */}
      <div className="jobs-header-container">
        <h1 className="jobs-header">Job Management</h1>
        <p className="jobs-subtitle">Manage and organize your job listings</p>
      </div>

      {/* Main Content */}
      <main className="jobs-main">
        {jobs.length === 0 ? (
          <div className="no-jobs-container">
            <div className="no-jobs-icon">📋</div>
            <h3 className="no-jobs-title">No Jobs Found</h3>
            <p className="no-jobs-text">
              There are no job listings to display at the moment.
            </p>
          </div>
        ) : (
          <div className="jobs-grid">
            {jobs.map((job) => (
              <article key={job._id} className="job-card">
                {/* Image Section */}
                <div className="job-image-container">
                  {job.image ? (
                    <img
                      src={job.image.startsWith("http") ? job.image : `/uploads/${job.image}`}
                      alt={`${job.company || "Company"} logo`}
                      className="job-image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="no-image-text">🏢</div>
                  )}
                  <div className="job-category-badge">
                    {job.category || "General"}
                  </div>
                </div>

                {/* Content Section */}
                <div className="job-details">
                  <h2 className="job-title">{job.title || "NO TITLE"}</h2>
                  <p className="job-company">{job.company || "Unknown Company"}</p>

                  {/* Job Information */}
                  <div className="job-info-container">
                    <div className="job-info-item">
                      <span className="job-info-icon">📍</span>
                      <span>{job.location || "N/A"}</span>
                    </div>
                    
                    {job.closingDate && (
                      <div className="job-info-item">
                        <span className="job-info-icon">📅</span>
                        <span>
                          Closes: {new Date(job.closingDate).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="job-description">
                    {job.description 
                      ? (job.description.length > 150 
                          ? job.description.substring(0, 150) + "..." 
                          : job.description)
                      : "No description available."
                    }
                  </p>

                  {/* Action Buttons */}
                  <div className="job-buttons">
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(job._id)}
                      disabled={deletingId === job._id}
                    >
                      {deletingId === job._id ? "Deleting..." : "Delete Job"}
                    </button>
                    
                    <button
                      className="btn-view"
                      onClick={() => navigate(`/job/${job._id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default JobsDelete;