import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a className="footer-link">Terms & Conditions</a>
          <span className="divider">|</span>
          <a className="footer-link">Privacy Policy</a>
        </div>
        <div className="social-icons">
          <a href="https://github.com/Yalarp" target="_blank" rel="noopener noreferrer" className="social-icon">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/pralay-te/" target="_blank" rel="noopener noreferrer" className="social-icon">
            LinkedIn
          </a>
          <a href="https://www.instagram.com/pralay_te/" target="_blank" rel="noopener noreferrer" className="social-icon">
            Instagram
          </a>
        </div>
        <p className="copyright">© 2025 Pralay Tembhurne. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
