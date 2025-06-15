import React, { useEffect, useState } from "react";
import { Spinner, Alert, Button } from "react-bootstrap";
import { fetchScholarships, deleteScholarship } from "../../api/scholarship";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/DeleteScholarships.css"; // Import the beautiful CSS file

const DeleteScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadScholarships = async () => {
      try {
        const data = await fetchScholarships();
        setScholarships(data);
        console.log(data);
        setError(null);
      } catch {
        setError("Failed to load scholarships. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadScholarships();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this scholarship?")) return;

    try {
      setDeletingId(id);
      await deleteScholarship(id);
      setScholarships((prev) => prev.filter((sch) => sch._id !== id));
    } catch {
      alert("Failed to delete the scholarship. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading)
    return (
      <div className="scholarships-loading">
        <div className="scholarships-loading-container">
          <div className="scholarships-loading-spinner"></div>
          <p className="scholarships-loading-text">Loading scholarships...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="scholarships-error-container">
        <div className="scholarships-error-card">
          <div className="scholarships-error-icon">⚠️</div>
          <h3 className="scholarships-error-title">Error</h3>
          <p className="scholarships-error-message">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="scholarships-list-portal">
      {/* Header */}
      <div className="scholarships-header-container">
        <h1 className="scholarships-header">Scholarship Management</h1>
        <p className="scholarships-subtitle">Manage and organize your scholarship listings</p>
      </div>

      {/* Main Content */}
      <main className="scholarships-main">
        {scholarships.length === 0 ? (
          <div className="no-scholarships-container">
            <div className="no-scholarships-icon">🎓</div>
            <h3 className="no-scholarships-title">No Scholarships Found</h3>
            <p className="no-scholarships-text">
              There are no scholarship listings to display at the moment.
            </p>
          </div>
        ) : (
          <div className="scholarships-grid">
            {scholarships.map((scholarship) => (
              <article key={scholarship._id} className="scholarship-card">
                {/* Image Section */}
                <div className="scholarship-image-container">
                  {scholarship.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${scholarship.image}`}
                      alt={`${scholarship.provider || "Scholarship"} image`}
                      className="scholarship-image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="no-image-text">🎓</div>
                  )}
                  
                  {/* Scholarship Badge */}
                  <div className="scholarship-badge">
                    Scholarship
                  </div>
                  
                  {/* Amount Badge (if available) */}
                  {scholarship.amount && (
                    <div className="scholarship-amount">
                      ${scholarship.amount.toLocaleString()}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="scholarship-details">
                  <h2 className="scholarship-title">{scholarship.title || "NO TITLE"}</h2>
                  <p className="scholarship-provider">{scholarship.provider || "Unknown Provider"}</p>

                  {/* Scholarship Information */}
                  <div className="scholarship-info-container">
                    {scholarship.eligibility && (
                      <div className="scholarship-info-item">
                        <span className="scholarship-info-icon">✅</span>
                        <span><strong>Eligibility:</strong> {scholarship.eligibility}</span>
                      </div>
                    )}
                    
                    {scholarship.level && (
                      <div className="scholarship-info-item">
                        <span className="scholarship-info-icon">📚</span>
                        <span><strong>Level:</strong> {scholarship.level}</span>
                      </div>
                    )}
                    
                    {scholarship.field && (
                      <div className="scholarship-info-item">
                        <span className="scholarship-info-icon">🎯</span>
                        <span><strong>Field:</strong> {scholarship.field}</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  {scholarship.description && (
                    <p className="scholarship-description">
                      {scholarship.description.length > 150 
                        ? scholarship.description.substring(0, 150) + "..." 
                        : scholarship.description
                      }
                    </p>
                  )}

                  {/* Closing Date */}
                  {scholarship.closingDate && (
                    <div className="scholarship-closing-date">
                      <span>
                        Closes: {new Date(scholarship.closingDate).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="scholarship-buttons">
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(scholarship._id)}
                      disabled={deletingId === scholarship._id}
                    >
                      {deletingId === scholarship._id ? "Deleting..." : "Delete Scholarship"}
                    </button>
                    
                    <button
                      className="btn-view"
                      onClick={() => navigate(`/scholarship/${scholarship._id}`)}
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

export default DeleteScholarships;