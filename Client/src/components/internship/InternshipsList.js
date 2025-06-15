import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/styles/InternshipsList.css";

const InternshipsList = ({ internships = [] }) => {
  return (
    <div className="internships-main-container">
      {/* Hero Welcome Section */}
      <div className="internships-hero-section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <div className="container">
            <div className="hero-content-flex">
              {/* Left side - Text content */}
              <div style={{textAlign:"center"}} className="hero-text-content">
                <div className="hero-icon">
                  <i className="fas fa-briefcase"></i>
                </div>
                <h1  className="hero-title ">
                  Launch Your Career Journey
                </h1>
                <p className="hero-subtitle">
                  Discover amazing internship opportunities from top companies worldwide
                </p>
              </div>

              {/* Right side - Stats cards */}
              <div style={{marginLeft:"6rem"}} className="hero-stats-grid">
                <div className="hero-stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-building"></i>
                  </div>
                  <h3>{internships.length}</h3>
                  <p>Active Internships</p>
                </div>
                <div className="hero-stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <h3>750+</h3>
                  <p>Students Placed</p>
                </div>
                <div className="hero-stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-trophy"></i>
                  </div>
                  <h3>200+</h3>
                  <p>Partner Companies</p>
                </div>
                <div className="hero-stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-star"></i>
                  </div>
                  <h3>98%</h3>
                  <p>Success Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="section-header text-center mb-5">
          <h2 className="internships-header">
            <i className="fas fa-rocket me-3"></i>
            Available Internships
          </h2>
          <div className="header-underline"></div>
          <p className="section-description">
            Browse through carefully curated internship opportunities and take the first step towards your dream career
          </p>
        </div>
      </div>

      {/* Main Content Section */}
      <section className="internships-list-section">
        <div className="container px-6 py-16 mx-auto">
          <div className="internships-grid row g-4">
            {internships.map((intern) => {
              const id = intern._id || intern.id;
              const imageSrc = intern.image?.startsWith("http")
                ? intern.image
                : `http://localhost:5000/uploads/${intern.image}`;

              return (
                <div key={id} className="col-lg-4 col-md-6 col-sm-12">
                  <Link
                    to={`/internships/${id}`}
                    className="internship-card-wrapper"
                  >
                    <div className="internship-card">
                      <div className="card-badge">
                        <i className="fas fa-fire"></i>
                        <span>Hot</span>
                      </div>

                      <div className="internship-image-container">
                        {intern.image ? (
                          <img
                            src={imageSrc}
                            alt={`${intern.company || "Company"} logo`}
                            className="internship-image"
                            loading="lazy"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "/api/placeholder/300/200";
                            }}
                          />
                        ) : (
                          <div className="no-image-placeholder">
                            <i className="fas fa-image"></i>
                            <span className="no-image-text">No Image</span>
                          </div>
                        )}
                        <div className="image-overlay">
                          <div className="overlay-content">
                            <i className="fas fa-external-link-alt"></i>
                            <span>View Details</span>
                          </div>
                        </div>
                      </div>

                      <div className="internship-details">
                        <div className="company-info">
                          <i className="fas fa-building me-2"></i>
                          <span className="internship-company">
                            {intern.company || "Unknown Company"}
                          </span>
                        </div>

                        <h2 className="internship-title">
                          {intern.title || "No Title"}
                        </h2>

                        <p className="internship-description">
                          {intern.description?.length > 120
                            ? intern.description.substring(0, 117) + "..."
                            : intern.description || "No description available."}
                        </p>

                        <div className="internship-features">
                          <div className="feature-item">
                            <i className="fas fa-clock"></i>
                            <span>Full-time</span>
                          </div>
                          <div className="feature-item">
                            <i className="fas fa-map-marker-alt"></i>
                            <span>Remote/On-site</span>
                          </div>
                          <div className="feature-item">
                            <i className="fas fa-certificate"></i>
                            <span>Certificate</span>
                          </div>
                        </div>

                        {intern.closingDate && (
                          <div className="internship-closing-date">
                            <div className="deadline-badge">
                              <i className="fas fa-calendar-alt"></i>
                              <div className="deadline-content">
                                <span className="deadline-label">Application Deadline:</span>
                                <span className="deadline-date">
                                  {new Date(intern.closingDate).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="card-footer">
                          <div className="apply-button">
                            <i className="fas fa-paper-plane me-2"></i>
                            Apply Now
                          </div>
                          <div className="card-actions">
                            <button className="action-btn bookmark-btn">
                              <i className="fas fa-bookmark"></i>
                            </button>
                            <button className="action-btn share-btn">
                              <i className="fas fa-share"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {internships.length === 0 && (
            <div className="no-internships text-center py-5">
              <div className="empty-state">
                <i className="fas fa-search fa-4x mb-4"></i>
                <h3>No Internships Available</h3>
                <p>Stay tuned! New opportunities are added regularly.</p>
                <button className="btn-notify">
                  <i className="fas fa-bell me-2"></i>
                  Notify Me
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default InternshipsList;