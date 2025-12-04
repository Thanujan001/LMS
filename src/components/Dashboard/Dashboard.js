import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { title: 'Enrolled Courses', value: '6', icon: '📚', color: '#3498db' },
    { title: 'Completed Assignments', value: '24', icon: '✅', color: '#27ae60' },
    { title: 'Upcoming Deadlines', value: '3', icon: '⏰', color: '#e74c3c' },
    { title: 'Overall Progress', value: '78%', icon: '📊', color: '#9b59b6' }
  ];

  const recentCourses = [
    { id: 1, title: 'React Development', progress: 85, instructor: 'Dr. Smith', nextClass: '2024-01-15' },
    { id: 2, title: 'JavaScript Fundamentals', progress: 92, instructor: 'Prof. Johnson', nextClass: '2024-01-16' },
    { id: 3, title: 'Web Design Principles', progress: 67, instructor: 'Ms. Davis', nextClass: '2024-01-17' }
  ];

  const upcomingAssignments = [
    { id: 1, title: 'React Component Project', course: 'React Development', dueDate: '2024-01-20', priority: 'high' },
    { id: 2, title: 'JavaScript Quiz', course: 'JavaScript Fundamentals', dueDate: '2024-01-18', priority: 'medium' },
    { id: 3, title: 'Design Portfolio', course: 'Web Design Principles', dueDate: '2024-01-25', priority: 'low' }
  ];

  const announcements = [
    { id: 1, title: 'New Course Available: Advanced React Patterns', date: '2024-01-12', type: 'info' },
    { id: 2, title: 'System Maintenance Scheduled', date: '2024-01-14', type: 'warning' },
    { id: 3, title: 'Congratulations on completing JavaScript Basics!', date: '2024-01-10', type: 'success' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}! 👋</h1>
        <p>Here's what's happening in your learning journey</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderLeftColor: stat.color }}>
            <div className="stat-icon" style={{ color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h2>📚 Recent Courses</h2>
          <div className="courses-list">
            {recentCourses.map(course => (
              <div key={course.id} className="course-item">
                <div className="course-info">
                  <h4>{course.title}</h4>
                  <p>Instructor: {course.instructor}</p>
                  <p>Next Class: {course.nextClass}</p>
                </div>
                <div className="course-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <span>{course.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>📝 Upcoming Assignments</h2>
          <div className="assignments-list">
            {upcomingAssignments.map(assignment => (
              <div key={assignment.id} className={`assignment-item priority-${assignment.priority}`}>
                <div className="assignment-info">
                  <h4>{assignment.title}</h4>
                  <p>{assignment.course}</p>
                </div>
                <div className="assignment-due">
                  <span className="due-date">{assignment.dueDate}</span>
                  <span className={`priority-badge priority-${assignment.priority}`}>
                    {assignment.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-section">
          <h2>📢 Announcements</h2>
          <div className="announcements-list">
            {announcements.map(announcement => (
              <div key={announcement.id} className={`announcement-item type-${announcement.type}`}>
                <div className="announcement-content">
                  <h4>{announcement.title}</h4>
                  <p>{announcement.date}</p>
                </div>
                <div className={`announcement-badge type-${announcement.type}`}>
                  {announcement.type === 'info' && '💡'}
                  {announcement.type === 'warning' && '⚠️'}
                  {announcement.type === 'success' && '🎉'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
