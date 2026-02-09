// Application constants
export const APP_NAME = 'My React App';
export const APP_VERSION = '1.0.0';

// API endpoints (example)
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Theme colors
export const COLORS = {
  primary: '#667eea',
  secondary: '#764ba2',
  success: '#27ae60',
  warning: '#f39c12',
  error: '#e74c3c',
  info: '#3498db',
  light: '#ecf0f1',
  dark: '#2c3e50'
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  large: '1200px'
};

// Local storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'userPreferences',
  THEME: 'theme',
  LANGUAGE: 'language'
};
