import React from "react";
import "../assets/styles/About.css";
import aboutImage from "../assets/image/about.png";
import profileImage1 from "../assets/image/Myprofile.jpeg";
import profileImage2 from "../assets/image/profile1.png";
import profileImage3 from "../assets/image/profile3.png";

const About = () => {
  const teamMembers = [
    {
      name: "Akbar Ali",
      role: "FUll Stack Developer",
      image: profileImage1
    },
    {
      name: "Muhammad Hafeez",
      role: "Amazon Web Services",
      image: profileImage2
    },
    {
      name: "Muhammad Haroon",
      role: "UI/UX Designer",
      image: profileImage3
    }
  ];

  const features = [
    "University, job, and visa application support",
    "Expert-to-user matching based on application type",
    "Secure document upload and management",
    "Real-time chat and communication with experts",
    "Integrated payment system with rating and reviews"
  ];

  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-content">
          <div className="hero-grid">
            {/* Left Side - Image */}
            <div className="image-container">
              <div className="image-glow"></div>
              <div className="image-wrapper">
                <img 
                  src={aboutImage} 
                  alt="About us" 
                  className="hero-image"
                />
                <div className="image-overlay"></div>
              </div>
              <div className="floating-element-1"></div>
              <div className="floating-element-2"></div>
            </div>

            {/* Right Side - Text */}
            <div className="text-content">
              <div className="content-wrapper">
                <div className="badge">
                  <span className="badge-icon">🎯</span>
                  About Our Project
                </div>
                
                <h1 className="main-title">Application Assistance Platform</h1>
                
                <p className="description">
                  Our platform connects users with experienced professionals who assist with complex application processes such as university admissions, job applications, and visa submissions. By simplifying documentation, ensuring proper formatting, and meeting deadlines, we help reduce errors and boost success rates.
                </p>
              </div>

              {/* Features List */}
              <div className="features-list">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="feature-item"
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className="feature-icon">
                      <span className="checkmark">✓</span>
                    </div>
                    <span className="feature-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <div className="team-header">
            <div className="team-badge">
              <span className="badge-icon">👥</span>
              Meet The Team
            </div>
            
            <h2 className="team-title">Our Team</h2>
            
            <p className="team-description">
              Our team is committed to building a reliable, secure, and user-focused application assistance platform. From system design to real-world implementation, we aim to bridge the gap between users and professionals for smoother application journeys.
            </p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="team-card"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <div className="card-wrapper">
                  <div className="card-overlay"></div>
                  
                  <div className="member-image-wrapper">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="member-image"
                    />
                    <div className="member-image-overlay"></div>
                  </div>
                  
                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                  </div>

                  <div className="card-border"></div>
                </div>

                <div className="floating-award">🏆</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Decorative elements */}
      <div className="decorative-element-1"></div>
      <div className="decorative-element-2"></div>
      <div className="decorative-element-3"></div>
    </div>
  );
};

export default About;
