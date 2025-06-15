import React from 'react';
import "../../assets/styles/Footer.css";
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn, FaGithub, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      <div className="footer-container">
        <div className="footer-main">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">JP</div>
              <div className="logo-text">JobPortal</div>
            </div>
            <p className="footer-description">
              Connecting talented professionals with amazing opportunities. 
              Your dream job is just a click away. Join thousands of successful 
              candidates who found their perfect career match with us.
            </p>
            <div className="social-links">
              <a href="#" className="social-link facebook" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="social-link twitter" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="social-link linkedin" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="#" className="social-link instagram" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="social-link github" aria-label="GitHub">
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/jobs" className="footer-link">Browse Jobs</a></li>
              <li><a href="/internships" className="footer-link">Internships</a></li>
              <li><a href="/scholarships" className="footer-link">Scholarships</a></li>
              <li><a href="/about" className="footer-link">About Us</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3 className="footer-title">Services</h3>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Job Search</a></li>
              <li><a href="#" className="footer-link">Resume Builder</a></li>
              <li><a href="#" className="footer-link">Career Advice</a></li>
              <li><a href="#" className="footer-link">Skill Assessment</a></li>
              <li><a href="#" className="footer-link">Salary Insights</a></li>
              <li><a href="#" className="footer-link">Employer Services</a></li>
            </ul>
          </div>

        
            
            <h4 className="footer-title newsletter-title">
              Newsletter
            </h4>
            <p className="newsletter-description">
              Subscribe to get latest job updates
            </p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              © {currentYear} JobPortal. All rights reserved. Made with ❤️ in Pakistan
            </div>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Privacy Policy</a>
              <a href="#" className="footer-bottom-link">Terms of Service</a>
              <a href="#" className="footer-bottom-link">Cookie Policy</a>
              <a href="#" className="footer-bottom-link">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

