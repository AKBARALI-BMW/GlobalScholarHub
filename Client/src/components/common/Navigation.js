import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react";

const Navigation = () => {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <nav className="nav">
      <ul className="flex space-x-4 items-center"> {/* Flex row with spacing */}
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/jobs" className="nav-link">Jobs</Link>
        </li>
        <li>
          <Link to="/scholarships" className="nav-link">Scholarships</Link>
        </li>
        <li>
          <Link to="/internships" className="nav-link">Internships</Link>
        </li>
        <li>
          <Link to="/about" className="nav-link">About</Link>
        </li>

        {isAdmin && (
          <li>
            <Link to="/admin" className="admin-link">Admin Dashboard</Link>
          </li>
        )}

        {!isAdmin && user && (
          <li>
            <Link to="/userdashboard" className="user-dashboard-link">
              Dashboard
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
