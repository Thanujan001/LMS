import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Assignments.css';

const Assignments = () => {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const assignments = [
    {
      id: 1,
      title: 'React Component Architecture Project',
      course: 'React Development Masterclass',
      description: 'Build a complete e-commerce application using React components, hooks, and context API. Include shopping cart functionality, product filtering, and user authentication.',
      dueDate: '2024-01-25',
      submittedDate: null,
      status: 'pending',
      priority: 'high',
      points: 100,
      type: 'project',
      requirements: [
        'Create at least 10 reusable components',
        'Implement React Router for navigation',
        'Use Context API for state management',
        'Include responsive design',
        'Write unit tests for key components'
      ],
      attachments: ['project-requirements.pdf', 'starter-code.zip']
    },
    {
      id: 2,
      title: 'JavaScript ES6+ Quiz',
      course: 'JavaScript Fundamentals',
      description: 'Complete quiz covering arrow functions, destructuring, promises, async/await, and modern JavaScript features.',
      dueDate: '2024-01-20',
      submittedDate: '2024-01-18',
      status: 'submitted',
      priority: 'medium',
      points: 50,
      type: 'quiz',
      grade: 85,
      feedback: 'Great understanding of ES6 features! Consider reviewing promise chaining for better async handling.'
    },
    {
      id: 3,
      title: 'UI/UX Design Portfolio',
      course: 'UI/UX Design Principles',
      description: 'Create a comprehensive design portfolio showcasing 3 different projects with user research, wireframes, and final designs.',
      dueDate: '2024-01-30',
      submittedDate: null,
      status: 'in_progress',
      priority: 'high',
      points: 150,
      type: 'portfolio',
      progress: 65,
      requirements: [
        'User research documentation',
        'Wireframes and mockups',
        'Final high-fidelity designs',
        'Design system documentation',
        'Presentation slides'
      ]
    },
    {
      id: 4,
      title: 'Data Analysis Report',
      course: 'Python for Data Science',
      description: 'Analyze the provided dataset and create a comprehensive report with visualizations and insights.',
      dueDate: '2024-02-05',
      submittedDate: null,
      status: 'not_started',
      priority: 'medium',
      points: 75,
      type: 'report'
    },
    {
      id: 5,
      title: 'CSS Animation Showcase',
      course: 'Advanced CSS & Animations',
      description: 'Create an interactive webpage demonstrating various CSS animation techniques and transitions.',
      dueDate: '2024-01-22',
      submittedDate: '2024-01-21',
      status: 'graded',
      priority: 'low',
      points: 60,
      type: 'project',
      grade: 92,
      feedback: 'Excellent use of keyframe animations! The interactive elements are very engaging.'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Assignments', count: assignments.length },
    { id: 'pending', label: 'Pending', count: assignments.filter(a => a.status === 'pending').length },
    { id: 'in_progress', label: 'In Progress', count: assignments.filter(a => a.status === 'in_progress').length },
    { id: 'submitted', label: 'Submitted', count: assignments.filter(a => a.status === 'submitted').length },
    { id: 'graded', label: 'Graded', count: assignments.filter(a => a.status === 'graded').length }
  ];

  const filteredAssignments = selectedFilter === 'all' 
    ? assignments 
    : assignments.filter(assignment => assignment.status === selectedFilter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#e74c3c';
      case 'in_progress': return '#f39c12';
      case 'submitted': return '#3498db';
      case 'graded': return '#27ae60';
      case 'not_started': return '#95a5a6';
      default: return '#7f8c8d';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#e74c3c';
      case 'medium': return '#f39c12';
      case 'low': return '#27ae60';
      default: return '#7f8c8d';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="assignments">
      <div className="assignments-header">
        <h1>📝 My Assignments</h1>
        <p>Track your assignments and submissions</p>
      </div>

      <div className="assignments-filters">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`filter-btn ${selectedFilter === filter.id ? 'active' : ''}`}
            onClick={() => setSelectedFilter(filter.id)}
          >
            {filter.label} ({filter.count})
          </button>
        ))}
      </div>

      <div className="assignments-grid">
        {filteredAssignments.map(assignment => {
          const daysUntilDue = getDaysUntilDue(assignment.dueDate);
          
          return (
            <div 
              key={assignment.id} 
              className={`assignment-card ${assignment.status}`}
              onClick={() => setSelectedAssignment(assignment)}
            >
              <div className="assignment-header">
                <div className="assignment-type">
                  {assignment.type === 'project' && '🚀'}
                  {assignment.type === 'quiz' && '❓'}
                  {assignment.type === 'portfolio' && '🎨'}
                  {assignment.type === 'report' && '📊'}
                  <span>{assignment.type}</span>
                </div>
                <div className="assignment-priority">
                  <span 
                    className="priority-dot" 
                    style={{ backgroundColor: getPriorityColor(assignment.priority) }}
                  ></span>
                </div>
              </div>

              <h3 className="assignment-title">{assignment.title}</h3>
              <p className="assignment-course">{assignment.course}</p>
              <p className="assignment-description">{assignment.description}</p>

              <div className="assignment-meta">
                <div className="due-date">
                  <span className="label">Due:</span>
                  <span className={`date ${daysUntilDue < 3 && assignment.status === 'pending' ? 'urgent' : ''}`}>
                    {formatDate(assignment.dueDate)}
                    {assignment.status === 'pending' && (
                      <span className="days-left">
                        ({daysUntilDue > 0 ? `${daysUntilDue} days left` : 'Overdue'})
                      </span>
                    )}
                  </span>
                </div>
                <div className="points">
                  <span className="label">Points:</span>
                  <span>{assignment.points}</span>
                </div>
              </div>

              {assignment.progress && (
                <div className="assignment-progress">
                  <div className="progress-info">
                    <span>Progress</span>
                    <span>{assignment.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${assignment.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {assignment.grade && (
                <div className="assignment-grade">
                  <span className="grade-label">Grade:</span>
                  <span className="grade-value">{assignment.grade}%</span>
                </div>
              )}

              <div className="assignment-status">
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: getStatusColor(assignment.status) }}
                >
                  {assignment.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {selectedAssignment && (
        <div className="assignment-modal" onClick={() => setSelectedAssignment(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedAssignment.title}</h2>
              <button 
                className="close-btn"
                onClick={() => setSelectedAssignment(null)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="assignment-details">
                <p><strong>Course:</strong> {selectedAssignment.course}</p>
                <p><strong>Due Date:</strong> {formatDate(selectedAssignment.dueDate)}</p>
                <p><strong>Points:</strong> {selectedAssignment.points}</p>
                <p><strong>Type:</strong> {selectedAssignment.type}</p>
                
                <div className="description-section">
                  <h4>Description</h4>
                  <p>{selectedAssignment.description}</p>
                </div>

                {selectedAssignment.requirements && (
                  <div className="requirements-section">
                    <h4>Requirements</h4>
                    <ul>
                      {selectedAssignment.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedAssignment.attachments && (
                  <div className="attachments-section">
                    <h4>Attachments</h4>
                    <div className="attachments-list">
                      {selectedAssignment.attachments.map((file, index) => (
                        <div key={index} className="attachment-item">
                          📎 {file}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedAssignment.feedback && (
                  <div className="feedback-section">
                    <h4>Instructor Feedback</h4>
                    <p className="feedback-text">{selectedAssignment.feedback}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-actions">
              {selectedAssignment.status === 'pending' && (
                <button className="btn-primary">Start Assignment</button>
              )}
              {selectedAssignment.status === 'in_progress' && (
                <button className="btn-primary">Continue Working</button>
              )}
              {selectedAssignment.status === 'submitted' && (
                <button className="btn-secondary">View Submission</button>
              )}
              {selectedAssignment.status === 'graded' && (
                <button className="btn-secondary">View Grade Details</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;
