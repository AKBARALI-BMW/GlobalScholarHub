import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/ScholarshipList.css";

const ScholarshipsList = ({ scholarships = [] }) => {
  return (
    <div className="scholarship-container">
      {/* Welcome Section */}
      <div className="welcome-section text-center mb-5">
        <div className="container">
          <h1 className="welcome-title">
            <i className="fas fa-graduation-cap me-3"></i>
            Welcome to Scholarship Portal
          </h1>
          <p className="welcome-subtitle">
            Discover amazing opportunities to fund your education journey
          </p>
          <div className="welcome-stats row mt-4">
            <div className="col-md-4">
              <div className="stat-card">
                <h5>{scholarships.length}</h5>
                <p>Available Scholarships</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card">
                <h5>500+</h5>
                <p>Students Helped</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="stat-card">
                <h5>$2M+</h5>
                <p>Scholarships Awarded</p>
              </div>
            </div>
          </div>
        </div>
           <div className="section-header text-center mb-5">
          <h2 className="section-title">Available Scholarships</h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Browse through our curated list of scholarships and find the perfect match for you
          </p>
        </div>
      </div>

      {/* Scholarships Grid */}
      
      <div className="container">
     

        <div className="row g-4">
          {scholarships.map((sch) => {
            const id = sch._id || sch.id;
            const imageSrc = sch.image?.startsWith("http")
              ? sch.image
              : `http://localhost:5000/uploads/${sch.image}`;

            return (
              <div key={id} className="col-lg-4 col-md-6 col-sm-12">
                <div className="scholarship-card h-100">
                  <div className="card-header-section">
                    <div className="scholarship-image-wrapper">
                      {sch.image ? (
                        <img
                          src={imageSrc}
                          alt={sch.title}
                          className="scholarship-image"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/api/placeholder/300/200";
                          }}
                        />
                      ) : (
                        <div className="no-image-placeholder">
                          <i className="fas fa-image"></i>
                          <span>No Image</span>
                        </div>
                      )}
                      <div className="image-overlay">
                        <div className="overlay-content">
                          <i className="fas fa-eye"></i>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-body-section">
                    <div className="scholarship-provider">
                      <i className="fas fa-university me-2"></i>
                      {sch.provider || "Unknown Provider"}
                    </div>
                    
                    <h3 className="scholarship-title">
                      {sch.title || "No Title"}
                    </h3>
                    
                    <p className="scholarship-description">
                      {sch.description?.length > 120
                        ? sch.description.substring(0, 117) + "..."
                        : sch.description || "No description available."}
                    </p>

                    {sch.closingDate && (
                      <div className="closing-date">
                        <i className="fas fa-calendar-alt me-2"></i>
                        <span className="date-label">Closing Date:</span>
                        <span className="date-value">
                          {new Date(sch.closingDate).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    )}

                    <div className="scholarship-requirements">
                      <h4 className="requirements-title">
                        <i className="fas fa-list-check me-2"></i>
                        Key Requirements:
                      </h4>
                      <ul className="requirements-list">
                        <li><i className="fas fa-check-circle me-2"></i>Academic Excellence</li>
                        <li><i className="fas fa-check-circle me-2"></i>Financial Need Assessment</li>
                        <li><i className="fas fa-check-circle me-2"></i>Complete Application</li>
                        <li><i className="fas fa-check-circle me-2"></i>Supporting Documents</li>
                      </ul>
                    </div>
                  </div>

                  <div className="card-footer-section">
                    <Link 
                      to={`/scholarship/${id}`} 
                      className="apply-btn"
                    >
                      <i className="fas fa-paper-plane me-2"></i>
                      Apply Now
                    </Link>
                    <Link 
                      to={`/scholarship/${id}`} 
                      className="details-btn"
                    >
                      <i className="fas fa-info-circle me-2"></i>
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {scholarships.length === 0 && (
          <div className="no-scholarships text-center py-5">
            <i className="fas fa-search fa-3x mb-3"></i>
            <h3>No Scholarships Available</h3>
            <p>Check back later for new opportunities!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScholarshipsList;