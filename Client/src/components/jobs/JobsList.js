import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/JobsList.css";

const JobsList = ({ jobs = [] }) => {
  return (
    <div className="jobs-list-wrapper">
      {/* Hero Section */}
      <div className="jobs-hero-section">
        <div className="hero-overlay"></div>
        <div className="container ">
          <div className="row justify-content-center text-center">
            <div className="col-lg-12 ms-5  col-md-10 col-sm-12 ">
              <div className="hero-content ">
                <h1  className="hero-title text-align-center ">
                  Welcome to Your Dream Career
                </h1>
                <p className="hero-subtitle">
                  Discover thousands of exciting job opportunities from top companies around the world. 
                  Your perfect career match is just a click away!
                </p>
                <div className="hero-stats">
                  <div className="stat-item">
                    <span className="stat-number">{jobs.length}+</span>
                    <span className="stat-label">Active Jobs</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">500+</span>
                    <span className="stat-label">Companies</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">50K+</span>
                    <span className="stat-label">Success Stories</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <section className="jobs-list-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <div className="section-header">
                <span className="section-badge">Opportunities</span>
                <h2 className="section-title">Featured Job Openings</h2>
                <p className="section-description">
                  Explore our curated selection of premium job opportunities from leading employers
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4">
            {jobs.map((job) => {
              const id = job._id || job.id;
              const imageSrc = job.image?.startsWith("http")
                ? job.image
                : `http://localhost:5000/uploads/${job.image}`;

              return (
                <div key={id} className="col-xl-4 col-lg-6 col-md-6">
                  <Link to={`/jobs/${id}`} className="job-card-link">
                    <div className="job-card">
                      <div className="job-card-header">
                        <div className="company-logo">
                          {job.image ? (
                            <img
                              src={imageSrc}
                              alt={`${job.company || "Company"} logo`}
                              className="logo-img"
                              loading="lazy"
                            />
                          ) : (
                            <div className="logo-placeholder">
                              <i className="fas fa-building"></i>
                            </div>
                          )}
                        </div>
                        <div className="job-badge">
                          <span className="badge-text">New</span>
                        </div>
                      </div>

                      <div className="job-card-body">
                        <h3 className="job-title">
                          {job.title || "No Title"}
                        </h3>
                        <p className="company-name">
                          <i className="fas fa-building me-2"></i>
                          {job.company || "Unknown Company"}
                        </p>
                        
                        <div className="job-meta">
                          <div className="meta-item">
                            <i className="fas fa-tag"></i>
                            <span>{job.category || "General"}</span>
                          </div>
                          {job.location && (
                            <div className="meta-item">
                              <i className="fas fa-map-marker-alt"></i>
                              <span>{job.location}</span>
                            </div>
                          )}
                          {job.salary && (
                            <div className="meta-item">
                              <i className="fas fa-dollar-sign"></i>
                              <span>{job.salary}</span>
                            </div>
                          )}
                        </div>

                        <div className="job-description">
                          <p>{job.description ? job.description.substring(0, 120) + '...' : 'Exciting opportunity to join our dynamic team and make a real impact.'}</p>
                        </div>
                      </div>

                      <div className="job-card-footer">
                        <div className="footer-left">
                          {job.closingDate && (
                            <span className="closing-date">
                              <i className="fas fa-calendar-alt me-1"></i>
                              Apply by {new Date(job.closingDate).toLocaleDateString(undefined, {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          )}
                        </div>
                        <div className="footer-right">
                          <span className="apply-btn">
                            Apply Now
                            <i className="fas fa-arrow-right ms-1"></i>
                          </span>
                        </div>
                      </div>

                      <div className="card-glow"></div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {jobs.length === 0 && (
            <div className="row">
              <div className="col-12">
                <div className="no-jobs-found">
                  <div className="no-jobs-icon">
                    <i className="fas fa-search"></i>
                  </div>
                  <h3>No Jobs Found</h3>
                  <p>We couldn't find any jobs matching your criteria. Try adjusting your search or check back later for new opportunities.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default JobsList;