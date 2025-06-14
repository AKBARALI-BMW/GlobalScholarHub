import React from "react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  if (!isLoaded) {
    return (
      <div className="loading-container d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary loading-spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      {/* Enhanced Admin Profile Section */}
      <div className="admin-profile">
        <div className="profile-header">
          <div className="profile-avatar">
            {/* Profile image will be shown via CSS background-image */}
          </div>
          <div className="profile-info">
            <h2>Admin Profile</h2>
            <p className="profile-subtitle">System Administrator</p>
          </div>
        </div>
        
        <div className="profile-grid">
          <div className="info-card">
            <div className="info-label">Full Name</div>
            <div className="info-value">{user.fullName || user.firstName || "Admin User"}</div>
          </div>
          
          <div className="info-card">
            <div className="info-label">Email Address</div>
            <div className="info-value">{user.primaryEmailAddress?.emailAddress || "admin@company.com"}</div>
          </div>
          
          <div className="info-card">
            <div className="info-label">Office Location</div>
            <div className="info-value">Admin Office, Uet Mardan Pakistan</div>
          </div>
          
          <div className="info-card">
            <div className="info-label">Phone Number</div>
            <div className="info-value">+923476092385</div>
          </div>
          
          <div className="info-card">
            <div className="info-label">Department</div>
            <div className="info-value">Computer Science</div>
          </div>
          
          <div className="info-card">
            <div className="info-label">Access Level</div>
            <div className="info-value">Super Administrator</div>
          </div>
        </div>
        
        <div className="description-card">
          <div className="info-label">Role Description</div>
          <div className="info-value">
            This dashboard allows the admin to manage Jobs, Internships, and Scholarships. 
            Post new opportunities, manage existing listings, and maintain the platform's content quality. 
            Ensure all listings meet company standards and provide value to our users.
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <main className="dashboard-content">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user.firstName || user.fullName || "Administrator"}! Manage your platform efficiently.</p>
        </div>

        <div className="dashboard-grid">
          {/* Jobs Card */}
          <section className="dashboard-card jobs-card">
            <div className="card-icon">💼</div>
            <h2>Jobs</h2>
            <div className="card-actions">
              <button 
                className="action-btn btn-post" 
                onClick={() => navigate("/postjob")}
              >
                <span className="btn-icon">📝</span>
                Post New Job
              </button>
              <button 
                className="action-btn btn-delete" 
                onClick={() => navigate("/dltjob")}
              >
                <span className="btn-icon">🗑️</span>
                Delete Listed Jobs
              </button>
            </div>
          </section>

          {/* Scholarships Card */}
          <section className="dashboard-card scholarships-card">
            <div className="card-icon">🎓</div>
            <h2>Scholarships</h2>
            <div className="card-actions">
              <button 
                className="action-btn btn-post" 
                onClick={() => navigate("/postscholarship")}
              >
                <span className="btn-icon">📝</span>
                Post New Scholarship
              </button>
              <button 
                className="action-btn btn-delete" 
                onClick={() => navigate("/dltscholarship")}
              >
                <span className="btn-icon">🗑️</span>
                Delete Listed Scholarships
              </button>
            </div>
          </section>

          {/* Internships Card */}
          <section className="dashboard-card internships-card">
            <div className="card-icon">💻</div>
            <h2>Internships</h2>
            <div className="card-actions">
              <button 
                className="action-btn btn-post" 
                onClick={() => navigate("/postinternship")}
              >
                <span className="btn-icon">📝</span>
                Post New Internship
              </button>
              <button 
                className="action-btn btn-delete-alt" 
                onClick={() => navigate("/dltinternship")}
              >
                <span className="btn-icon">🗑️</span>
                Delete Listed Internships
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

