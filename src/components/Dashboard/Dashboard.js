import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'New Course Available: Advanced React Patterns', date: '2024-01-12', type: 'info' },
    { id: 2, title: 'System Maintenance Scheduled', date: '2024-01-14', type: 'warning' },
    { id: 3, title: 'Congratulations on completing JavaScript Basics!', date: '2024-01-10', type: 'success' }
  ]);

  const stats = [
    { title: 'Enrolled Courses', value: '6', icon: '📚', color: '#3498db', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { title: 'Completed Assignments', value: '24', icon: '✅', color: '#27ae60', gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)' },
    { title: 'Upcoming Deadlines', value: '3', icon: '⏰', color: '#e74c3c', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { title: 'Overall Progress', value: '78%', icon: '📊', color: '#9b59b6', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }
  ];

  const joinedClasses = [
    { id: 1, name: 'React Development', instructor: 'Dr. Smith', time: 'Mon, Wed, Fri 10:00 AM', room: '201', color: '#667eea' },
    { id: 2, name: 'JavaScript Fundamentals', instructor: 'Prof. Johnson', time: 'Tue, Thu 2:00 PM', room: '305', color: '#764ba2' },
    { id: 3, name: 'Web Design Principles', instructor: 'Ms. Davis', time: 'Wed 1:00 PM', room: '102', color: '#f093fb' },
    { id: 4, name: 'Database Management', instructor: 'Dr. Wilson', time: 'Mon, Wed 3:00 PM', room: '404', color: '#56ab2f' }
  ];

  const monthlyPlan = [
    { week: 'Week 1', focus: 'React Hooks & State Management', status: 'in-progress' },
    { week: 'Week 2', focus: 'Advanced JavaScript Patterns', status: 'upcoming' },
    { week: 'Week 3', focus: 'UI/UX Design Principles', status: 'upcoming' },
    { week: 'Week 4', focus: 'Database Design & Optimization', status: 'upcoming' }
  ];

  const calendarDays = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    hasEvent: Math.random() > 0.7
  }));

  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter(ann => ann.id !== id));
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome back, {user?.name}! 👋</h1>
          <p>Here's your personalized learning dashboard</p>
        </div>
        <div className="header-date">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ background: stat.gradient }}>
            <div className="stat-icon">
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-top-section">
        {/* Joined Classes */}
        <div className="dashboard-section joined-classes-section">
          <div className="section-header">
            <h2>👥 Joined Classes</h2>
            <span className="section-count">{joinedClasses.length} Classes</span>
          </div>
          <div className="classes-grid">
            {joinedClasses.map(classItem => (
              <div key={classItem.id} className="class-card" style={{ borderLeftColor: classItem.color }}>
                <div className="class-header">
                  <h4>{classItem.name}</h4>
                  <span className="room-badge">{classItem.room}</span>
                </div>
                <p className="class-instructor">👨‍🏫 {classItem.instructor}</p>
                <p className="class-time">⏱️ {classItem.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="dashboard-section calendar-section">
          <div className="section-header">
            <h2>📅 Calendar</h2>
            <span className="month-year">January 2024</span>
          </div>
          <div className="calendar">
            <div className="calendar-header">
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>
            <div className="calendar-grid">
              {calendarDays.map(day => (
                <div key={day.day} className={`calendar-day ${day.hasEvent ? 'has-event' : ''}`}>
                  {day.day}
                  {day.hasEvent && <div className="event-indicator"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Plan */}
      <div className="dashboard-section monthly-plan-section">
        <div className="section-header">
          <h2>📋 This Month's Plan</h2>
        </div>
        <div className="monthly-plan-grid">
          {monthlyPlan.map((plan, index) => (
            <div key={index} className={`plan-card ${plan.status}`}>
              <div className="plan-week">{plan.week}</div>
              <div className="plan-focus">{plan.focus}</div>
              <div className="plan-status-badge">{plan.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Announcements */}
        <div className="dashboard-section announcements-section">
          <div className="section-header">
            <h2>📢 Announcements</h2>
            <span className="section-count">{announcements.length} New</span>
          </div>
          <div className="announcements-list">
            {announcements.length === 0 ? (
              <div className="no-announcements">No announcements at the moment</div>
            ) : (
              announcements.map(announcement => (
                <div key={announcement.id} className={`announcement-item type-${announcement.type}`}>
                  <div className="announcement-content">
                    <h4>{announcement.title}</h4>
                    <p>{announcement.date}</p>
                  </div>
                  <div className="announcement-actions">
                    <div className={`announcement-badge type-${announcement.type}`}>
                      {announcement.type === 'info' && '💡'}
                      {announcement.type === 'warning' && '⚠️'}
                      {announcement.type === 'success' && '🎉'}
                    </div>
                    <button 
                      className="delete-btn" 
                      onClick={() => deleteAnnouncement(announcement.id)}
                      title="Delete announcement"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
