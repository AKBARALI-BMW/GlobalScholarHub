import React, { useState, useEffect } from "react";
import "../assets/styles/HeroSection.css";
import bgImage from "../assets/image/bg_2.jpg";

const HeroSection = ({ 
  showText = true, 
  height = "100vh", 
  breadcrumb,  
  backgroundImage = bgImage 
}) => {
  const [searchType, setSearchType] = useState("job");
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Animation trigger on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Mouse movement effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  return (
    <section 
      className={`hero ${isVisible ? 'hero-visible' : ''}`} 
      style={{ 
        height, 
        backgroundImage: `url(${backgroundImage})`,
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic Background Elements */}
      <div className="hero-bg-wrapper">
        <div className="hero-bg-image"></div>
        <div className="hero-gradient-overlay"></div>
        <div className="hero-pattern-overlay"></div>
      </div>

      {/* Animated Particles */}
      <div className="particles-container">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`particle particle-${i % 4}`}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          ></div>
        ))}
      </div>

      {/* Mouse Follower Effect */}
      <div 
        className="mouse-follower"
        style={{
          transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`
        }}
      ></div>

      {/* Breadcrumb Navigation */}
      {breadcrumb && (
        <div className="breadcrumb-container">
          <div className="breadcrumb">{breadcrumb}</div>
        </div>
      )}

      {showText && (
        <div className="hero-content">
          {/* Stats Counter */}
          <div className="stats-badge">
            <div className="stats-counter">
              <span className="counter-number">850K+</span>
              <span className="counter-label">Great Opportunities</span>
            </div>
            <div className="stats-pulse"></div>
          </div>

          {/* Main Content */}
          <div className="hero-text-wrapper">
            <p className="hero-subtitle">
              <span className="subtitle-icon">✨</span>
              We have 850,000 great job offers you deserve!
            </p>
            
            <h1 className="hero-title">
              <span className="title-line">
                Your <span className="highlight">Dream</span>
              </span>
              <span className="title-line">
                Job & Scholarships
              </span>
              <span className="title-line">
                is <span className="waiting-text">Waiting</span>
              </span>
            </h1>

            {/* Decorative Elements */}
            <div className="hero-decorations">
              <div className="decoration-line"></div>
              <div className="decoration-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          {/* Enhanced Buttons */}
          <div className="hero-buttons">
            <button 
              className={`hero-btn primary-btn ${searchType === "job" ? "active-btn" : ""}`} 
              onClick={() => setSearchType("job")}
            >
              <span className="btn-icon">🔍</span>
              <span className="btn-text">Find a Job</span>
              <div className="btn-shine"></div>
            </button>
            
            <button 
              className="hero-btn secondary-btn"
              onClick={() => setSearchType("scholarship")}
            >
              <span className="btn-icon">🎓</span>
              <span className="btn-text">Find Scholarships</span>
              <div className="btn-ripple"></div>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="trust-indicators">
            <div className="indicator">
              <span className="indicator-icon">⭐</span>
              <span className="indicator-text">4.9/5 Rating</span>
            </div>
            <div className="indicator">
              <span className="indicator-icon">👥</span>
              <span className="indicator-text">2M+ Users</span>
            </div>
            <div className="indicator">
              <span className="indicator-icon">🏢</span>
              <span className="indicator-text">50K+ Companies</span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="scroll-indicator">
            <div className="scroll-arrow">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p className="scroll-text">Scroll to explore</p>
          </div>
        </div>
      )}

      {/* Corner Decorations */}
      <div className="corner-decoration top-left"></div>
      <div className="corner-decoration top-right"></div>
      <div className="corner-decoration bottom-left"></div>
      <div className="corner-decoration bottom-right"></div>

      {/* Floating Action Elements */}
      <div className="floating-elements">
        <div className="floating-element job-icon">💼</div>
        <div className="floating-element education-icon">📚</div>
        <div className="floating-element growth-icon">📈</div>
        <div className="floating-element star-icon">⭐</div>
      </div>
    </section>
  );
};

export default HeroSection;