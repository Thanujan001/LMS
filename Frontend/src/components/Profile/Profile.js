import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'student@lms.com',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate learner focused on web development and modern technologies. Currently pursuing advanced React development and UI/UX design.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    joinDate: '2023-09-15',
    timezone: 'Pacific Standard Time (PST)',
    language: 'English',
    notifications: {
      email: true,
      push: true,
      assignments: true,
      grades: true,
      announcements: false
    }
  });

  const stats = [
    { label: 'Courses Enrolled', value: '6', icon: '📚' },
    { label: 'Assignments Completed', value: '24', icon: '✅' },
    { label: 'Total Points Earned', value: '1,850', icon: '🏆' },
    { label: 'Average Grade', value: '87%', icon: '📊' }
  ];

  const achievements = [
    { id: 1, title: 'First Assignment', description: 'Completed your first assignment', icon: '🎯', earned: true, date: '2023-09-20' },
    { id: 2, title: 'Perfect Score', description: 'Achieved 100% on an assignment', icon: '💯', earned: true, date: '2023-10-15' },
    { id: 3, title: 'Course Completion', description: 'Completed your first course', icon: '🎓', earned: true, date: '2023-11-30' },
    { id: 4, title: 'Streak Master', description: 'Maintained a 7-day learning streak', icon: '🔥', earned: true, date: '2023-12-10' },
    { id: 5, title: 'Top Performer', description: 'Ranked in top 10% of class', icon: '⭐', earned: false, date: null },
    { id: 6, title: 'Mentor', description: 'Helped 5 fellow students', icon: '🤝', earned: false, date: null }
  ];

  const recentActivity = [
    { id: 1, type: 'assignment', title: 'Submitted React Component Project', date: '2024-01-18', icon: '📝' },
    { id: 2, type: 'grade', title: 'Received grade for CSS Animation Showcase', date: '2024-01-17', icon: '📊' },
    { id: 3, type: 'course', title: 'Started Advanced CSS & Animations', date: '2024-01-15', icon: '📚' },
    { id: 4, type: 'achievement', title: 'Earned "Streak Master" achievement', date: '2024-01-12', icon: '🏆' },
    { id: 5, type: 'assignment', title: 'Completed JavaScript ES6+ Quiz', date: '2024-01-10', icon: '✅' }
  ];

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field) => {
    setProfileData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: !prev.notifications[field]
      }
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Profile updated:', profileData);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '👤' },
    { id: 'activity', label: 'Activity', icon: '📈' },
    { id: 'achievements', label: 'Achievements', icon: '🏆' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-banner">
          <div className="profile-avatar">
            <span className="avatar-text">{profileData.name.charAt(0)}</span>
          </div>
          <div className="profile-info">
            <h1>{profileData.name}</h1>
            <p className="profile-role">{user?.role || 'Student'}</p>
            <p className="profile-location">📍 {profileData.location}</p>
            <p className="profile-joined">Joined {new Date(profileData.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</p>
          </div>
          <div className="profile-actions">
            <button 
              className={`edit-btn ${isEditing ? 'active' : ''}`}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            {isEditing && (
              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
            )}
          </div>
        </div>

        <div className="profile-stats">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <span className="stat-icon">{stat.icon}</span>
              <div className="stat-content">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="profile-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="profile-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="profile-section">
              <h3>About Me</h3>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="bio-input"
                  rows="4"
                />
              ) : (
                <p className="bio-text">{profileData.bio}</p>
              )}
            </div>

            <div className="profile-section">
              <h3>Contact Information</h3>
              <div className="contact-grid">
                <div className="contact-item">
                  <label>Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <span>{profileData.email}</span>
                  )}
                </div>
                <div className="contact-item">
                  <label>Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <span>{profileData.phone}</span>
                  )}
                </div>
                <div className="contact-item">
                  <label>Website</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                    />
                  ) : (
                    <a href={profileData.website} target="_blank" rel="noopener noreferrer">
                      {profileData.website}
                    </a>
                  )}
                </div>
                <div className="contact-item">
                  <label>LinkedIn</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={profileData.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    />
                  ) : (
                    <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer">
                      {profileData.linkedin}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="activity-tab">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              {recentActivity.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">{activity.icon}</div>
                  <div className="activity-content">
                    <p className="activity-title">{activity.title}</p>
                    <p className="activity-date">{new Date(activity.date).toLocaleDateString()}</p>
                  </div>
                  <div className="activity-type">
                    <span className={`type-badge ${activity.type}`}>
                      {activity.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="achievements-tab">
            <h3>Achievements & Badges</h3>
            <div className="achievements-grid">
              {achievements.map(achievement => (
                <div 
                  key={achievement.id} 
                  className={`achievement-card ${achievement.earned ? 'earned' : 'locked'}`}
                >
                  <div className="achievement-icon">{achievement.icon}</div>
                  <h4 className="achievement-title">{achievement.title}</h4>
                  <p className="achievement-description">{achievement.description}</p>
                  {achievement.earned && achievement.date && (
                    <p className="achievement-date">
                      Earned on {new Date(achievement.date).toLocaleDateString()}
                    </p>
                  )}
                  {!achievement.earned && (
                    <p className="achievement-locked">🔒 Not yet earned</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-tab">
            <div className="settings-section">
              <h3>Preferences</h3>
              <div className="settings-grid">
                <div className="setting-item">
                  <label>Timezone</label>
                  <select 
                    value={profileData.timezone}
                    onChange={(e) => handleInputChange('timezone', e.target.value)}
                  >
                    <option value="Pacific Standard Time (PST)">Pacific Standard Time (PST)</option>
                    <option value="Eastern Standard Time (EST)">Eastern Standard Time (EST)</option>
                    <option value="Central Standard Time (CST)">Central Standard Time (CST)</option>
                    <option value="Mountain Standard Time (MST)">Mountain Standard Time (MST)</option>
                  </select>
                </div>
                <div className="setting-item">
                  <label>Language</label>
                  <select 
                    value={profileData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Spanish</option>
                    <option value="French">French</option>
                    <option value="German">German</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="settings-section">
              <h3>Notifications</h3>
              <div className="notifications-list">
                <div className="notification-item">
                  <div className="notification-info">
                    <label>Email Notifications</label>
                    <p>Receive notifications via email</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={profileData.notifications.email}
                      onChange={() => handleNotificationChange('email')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notification-info">
                    <label>Push Notifications</label>
                    <p>Receive push notifications in browser</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={profileData.notifications.push}
                      onChange={() => handleNotificationChange('push')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notification-info">
                    <label>Assignment Reminders</label>
                    <p>Get reminded about upcoming assignments</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={profileData.notifications.assignments}
                      onChange={() => handleNotificationChange('assignments')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notification-info">
                    <label>Grade Updates</label>
                    <p>Notify when grades are posted</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={profileData.notifications.grades}
                      onChange={() => handleNotificationChange('grades')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notification-info">
                    <label>Announcements</label>
                    <p>Receive course announcements</p>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={profileData.notifications.announcements}
                      onChange={() => handleNotificationChange('announcements')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
