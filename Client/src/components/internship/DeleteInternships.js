import React, { useEffect, useState } from "react";
import { Spinner, Alert, Button } from "react-bootstrap";
import { fetchInternships, deleteInternship } from "../../api/internship"; // Adjust path if needed
import { useNavigate } from "react-router-dom";
import "../../assets/styles/DeleteInternships.css";

const DeleteInternships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadInternships = async () => {
      try {
        const data = await fetchInternships();
        setInternships(data);
        setError(null);
      } catch {
        setError("Failed to load internships. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    loadInternships();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this internship?")) return;

    try {
      setDeletingId(id);
      await deleteInternship(id);
      setInternships((prev) => prev.filter((internship) => internship._id !== id));
    } catch {
      alert("Failed to delete the internship. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  // Filter internships based on search term and category
  const filteredInternships = internships.filter((internship) => {
    const matchesSearch = 
      internship.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      filterCategory === "" || internship.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = [...new Set(internships.map(internship => internship.category).filter(Boolean))];

  if (loading)
    return (
      <div className="internships-loading">
        <div className="loading-spinner">
          <Spinner animation="border" variant="primary" />
          <p>Loading internships...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="internships-error-container">
        <Alert variant="danger" className="internships-error">
          <div className="error-content">
            <i className="fas fa-exclamation-triangle"></i>
            {error}
          </div>
        </Alert>
      </div>
    );

  return (
    <div className="internships-container">
      {/* Header Section */}
      <div className="internships-header-section">
        <div className="header-content">
          <h1 className="page-title">
            <i className="fas fa-briefcase"></i>
            Internships Management
          </h1>
          <p className="page-subtitle">Manage and organize your internship opportunities</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-number">{internships.length}</span>
            <span className="stat-label">Total Internships</span>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="search-filter-section">
        <div className="search-container">
          <div className="search-input-wrapper">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Search internships by title, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="filter-container">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Content */}
      <main className="internships-main">
        {filteredInternships.length === 0 ? (
          <div className="no-internships-container">
            <div className="no-internships-content">
              <i className="fas fa-inbox empty-icon"></i>
              <h3>No internships found</h3>
              <p>
                {searchTerm || filterCategory 
                  ? "Try adjusting your search or filter criteria" 
                  : "No internships available at the moment"}
              </p>
            </div>
          </div>
        ) : (
          <div className="internships-grid">
            {filteredInternships.map((internship) => (
              <article key={internship._id} className="internship-card">
                {/* Card Header with Image */}
                <div className="card-header">
                  <div className="internship-image-container">
                    {internship.image ? (
                      <img 
                        src={`http://localhost:5000/uploads/${internship.image}`} 
                        alt={internship.title || "Internship"} 
                        className="internship-image"
                      />
                    ) : (
                      <div className="no-image-placeholder">
                        <i className="fas fa-building"></i>
                        <span>No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="card-badge">
                    {internship.category || "General"}
                  </div>
                </div>

                {/* Card Content */}
                <div className="card-content">
                  <div className="internship-header">
                    <h2 className="internship-title">
                      {internship.title || "NO TITLE"}
                    </h2>
                    <p className="internship-company">
                      <i className="fas fa-building company-icon"></i>
                      {internship.company || "Unknown Company"}
                    </p>
                  </div>

                  <div className="internship-meta">
                    <div className="meta-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{internship.location || "Remote"}</span>
                    </div>
                    {internship.closingDate && (
                      <div className="meta-item closing-date">
                        <i className="fas fa-calendar-alt"></i>
                        <span>
                          {new Date(internship.closingDate).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="internship-description">
                    <p>{internship.description || "No description available."}</p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="card-actions">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => navigate(`/internship/${internship._id}`)}
                    className="btn-view"
                  >
                    <i className="fas fa-eye"></i>
                    View Details
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(internship._id)}
                    disabled={deletingId === internship._id}
                    className="btn-delete"
                  >
                    {deletingId === internship._id ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-1" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-trash"></i>
                        Delete
                      </>
                    )}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default DeleteInternships;