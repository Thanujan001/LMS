import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>My React App</h4>
            <p>A modern React environment ready for development</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React Docs</a></li>
              <li><a href="https://create-react-app.dev" target="_blank" rel="noopener noreferrer">Create React App</a></li>
              <li><a href="https://developer.mozilla.org" target="_blank" rel="noopener noreferrer">MDN Web Docs</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 My React App. Built with React {React.version}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
