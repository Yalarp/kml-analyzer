// File: src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <i className="fas fa-map-marked-alt"></i>
          <span>KML Analyzer</span>
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <a 
              href="https://developers.google.com/kml/documentation" 
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-link"
            >
              KML Docs
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;