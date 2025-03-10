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
            <Link to="https://pralay-portfolio.netlify.app/" className="nav-link">My Portfolio</Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;