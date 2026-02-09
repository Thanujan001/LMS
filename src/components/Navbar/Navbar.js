import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = ({ currentPage, onNavigate }) => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getMenuItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: '📊' },
      { id: 'profile', label: 'Profile', icon: '👤' }
    ];

    if (user?.role === 'student') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'courses', label: 'Classes', icon: '📚' },
        { id: 'assignments', label: 'Assignments', icon: '📝' },
        { id: 'progress', label: 'Progress', icon: '📈' },
        { id: 'grades', label: 'Grades', icon: '📊' },
        { id: 'calendar', label: 'Calendar', icon: '📅' },
        { id: 'profile', label: 'Profile', icon: '👤' }
      ];
    } else if (user?.role === 'teacher') {
      return [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'classes', label: 'My Classes', icon: '📚' },
        { id: 'students', label: 'Students', icon: '👥' },
        { id: 'assignments', label: 'Assignments', icon: '📝' },
        { id: 'calendar', label: 'Academic Calendar', icon: '📅' },
        { id: 'grades', label: 'Grades', icon: '📊' },
        { id: 'profile', label: 'Profile', icon: '👤' }
      ];
    }
    return commonItems;
  };

  const menuItems = getMenuItems();

  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
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
                  <span className="nav-icon">{item.icon}</span>
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
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
