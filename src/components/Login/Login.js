import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const demoCredentials = [
    { role: 'Student', email: 'student@lms.com', password: 'student123' },
    { role: 'Teacher', email: 'teacher@lms.com', password: 'teacher123' },
    { role: 'Admin', email: 'admin@lms.com', password: 'admin123' }
  ];

  const fillDemoCredentials = (email, password) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="login-container">
      <div className="login-illustration">
        <div className="illustration-content">
          <div className="education-graphic">
            <div className="book-stack">
              <div className="book book-1">📘</div>
              <div className="book book-2">📗</div>
              <div className="book book-3">📙</div>
            </div>
            <div className="graduation-cap">🎓</div>
            <div className="lightbulb">💡</div>
          </div>
          <h2>Learn. Grow. Succeed.</h2>
          <p>Join thousands of students in their learning journey</p>
        </div>
      </div>
      
      <div className="login-card">
        <div className="login-header">
          <h1>📚 NextGen LMS</h1>
          <p>Welcome back! Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="demo-section">
          <h3>Demo Accounts</h3>
          <p>Click to auto-fill credentials:</p>
          <div className="demo-buttons">
            {demoCredentials.map((cred, index) => (
              <button
                key={index}
                type="button"
                className="demo-btn"
                onClick={() => fillDemoCredentials(cred.email, cred.password)}
              >
                {cred.role}
              </button>
            ))}
          </div>
        </div>

        <div className="login-footer">
          <p>Don't have an account? <a href="#signup">Sign up here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
