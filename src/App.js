import React, { useState } from 'react';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Courses from './components/Courses/Courses';
import Assignments from './components/Assignments/Assignments';
import Calendar from './components/Calendar/Calendar';
import TeacherCalendar from './components/TeacherCalendar/TeacherCalendar';
import Profile from './components/Profile/Profile';
import Progress from './components/Progress/Progress';

// Main LMS Application Component
const LMSApp = () => {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner">📚</div>
        <p>Loading NextGen LMS...</p>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'courses':
      case 'classes':
        return <Courses />;
      case 'assignments':
        return <Assignments />;
      case 'progress':
        return <Progress />;
      case 'grades':
        return <div className="page-placeholder">📈 Grades page coming soon!</div>;
      case 'students':
        return <div className="page-placeholder">👥 Students Management coming soon!</div>;
      case 'calendar':
        return user?.role === 'teacher' ? <TeacherCalendar /> : <Calendar isFullPage={true} />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="lms-app">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="lms-content">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <LMSApp />
      </div>
    </AuthProvider>
  );
}

export default App;

