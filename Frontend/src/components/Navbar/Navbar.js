import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = ({ currentPage, onNavigate }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '' },
    { id: 'courses', label: 'Classes', icon: '' },
    { id: 'assignments', label: 'Assignments', icon: '' },
    { id: 'calendar', label: 'Calendar', icon: '' },
    { id: 'profile', label: 'Profile', icon: '' }
  ];

  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  const handleMenuClick = (e) => {
    if (e.target.closest('.navbar-menu') || e.target.closest('.mobile-menu-btn')) {
      return;
    }
    setIsMenuOpen(false);
  };

  // Close menu on escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="navbar" onClick={handleMenuClick} onKeyDown={handleKeyDown}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <h2>📚 NextGen LMS</h2>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-nav">
            {menuItems.map((item) => (
              <li key={item.id} className="nav-item">
                <button
                  className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                >
                  <span className="nav-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-user">
          <div className="user-info">
            <span className="user-name">Welcome, {user?.name}</span>
            <span className="user-role">{user?.role}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
