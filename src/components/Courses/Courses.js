import React, { useState } from 'react';
import './Courses.css';

const Courses = () => {
  const [selectedSection, setSelectedSection] = useState('theory');

  const theoryClasses = [
    {
      id: 1,
      name: 'React Fundamentals',
      instructor: 'Dr. Sarah Smith',
      lessons: ['Components & JSX', 'State & Props', 'Hooks Overview', 'Component Lifecycle'],
      timeTable: 'Mon, Wed, Fri - 10:00 AM',
      place: 'Room 201',
      duration: '12 weeks',
      students: 150,
      color: '#667eea'
    },
    {
      id: 2,
      name: 'JavaScript Advanced',
      instructor: 'Prof. Mike Johnson',
      lessons: ['ES6+ Features', 'Async Programming', 'Closures & Scope', 'Prototypes & OOP'],
      timeTable: 'Tue, Thu - 2:00 PM',
      place: 'Room 305',
      duration: '10 weeks',
      students: 200,
      color: '#764ba2'
    },
    {
      id: 3,
      name: 'Web Design Principles',
      instructor: 'Ms. Emily Davis',
      lessons: ['Color Theory & Psychology', 'Typography & Fonts', 'Layout & Grid Systems', 'User Experience Design'],
      timeTable: 'Mon, Wed - 1:00 PM',
      place: 'Room 102',
      duration: '8 weeks',
      students: 120,
      color: '#f093fb'
    },
    {
      id: 4,
      name: 'Database Design',
      instructor: 'Dr. Wilson',
      lessons: ['Relational Database Concepts', 'Normalization & Schema', 'SQL Query Fundamentals', 'Indexing & Optimization'],
      timeTable: 'Tue, Thu, Sat - 3:00 PM',
      place: 'Room 404',
      duration: '10 weeks',
      students: 95,
      color: '#56ab2f'
    }
  ];

  const revisionClasses = [
    {
      id: 5,
      name: 'React Quick Review',
      instructor: 'Dr. Sarah Smith',
      lessons: ['Components Review', 'Hooks Deep Dive', 'Performance Tips', 'Common Patterns'],
      timeTable: 'Sat - 4:00 PM',
      place: 'Room 201',
      duration: '4 weeks',
      students: 80,
      color: '#f5576c'
    },
    {
      id: 6,
      name: 'JavaScript Revision',
      instructor: 'Prof. Mike Johnson',
      lessons: ['Core Concepts', 'Problem Solving', 'Best Practices', 'Code Review'],
      timeTable: 'Sun - 2:00 PM',
      place: 'Room 305',
      duration: '3 weeks',
      students: 110,
      color: '#fa7e1e'
    },
    {
      id: 7,
      name: 'Design Fundamentals Recap',
      instructor: 'Ms. Emily Davis',
      lessons: ['Design Principles', 'Visual Hierarchy', 'Responsive Design', 'Prototyping'],
      timeTable: 'Sat - 11:00 AM',
      place: 'Room 102',
      duration: '4 weeks',
      students: 70,
      color: '#a8e063'
    }
  ];

  const paperClasses = [
    {
      id: 8,
      name: 'React Exam Prep',
      instructor: 'Dr. Sarah Smith',
      lessons: ['Mock Tests', 'Practice Questions', 'Time Management', 'Exam Tips'],
      timeTable: 'Sun - 10:00 AM',
      place: 'Room 201',
      duration: '2 weeks',
      students: 140,
      color: '#00d4ff'
    },
    {
      id: 9,
      name: 'JavaScript Mock Exams',
      instructor: 'Prof. Mike Johnson',
      lessons: ['Question Analysis', 'Solution Strategies', 'Speed Practice', 'Final Review'],
      timeTable: 'Sat - 3:00 PM',
      place: 'Room 305',
      duration: '2 weeks',
      students: 160,
      color: '#4facfe'
    },
    {
      id: 10,
      name: 'Design Assessment Test',
      instructor: 'Ms. Emily Davis',
      lessons: ['Design Challenges', 'Portfolio Review', 'Interview Prep', 'Project Showcase'],
      timeTable: 'Sun - 6:00 PM',
      place: 'Room 102',
      duration: '1 week',
      students: 85,
      color: '#43e97b'
    },
    {
      id: 11,
      name: 'Database Final Exam',
      instructor: 'Dr. Wilson',
      lessons: ['Complex Queries', 'Performance Issues', 'Real-world Scenarios', 'Case Studies'],
      timeTable: 'Sat - 2:00 PM',
      place: 'Room 404',
      duration: '2 weeks',
      students: 75,
      color: '#fa709a'
    }
  ];

  const renderClassCard = (classItem) => (
    <div key={classItem.id} className="class-card" style={{ borderLeftColor: classItem.color }}>
      <div className="class-header">
        <div className="class-name-section">
          <h3 className="class-name">{classItem.name}</h3>
          <p className="class-instructor">👨‍🏫 {classItem.instructor}</p>
        </div>
        <div className="class-meta-badge" style={{ background: classItem.color }}>
          <span className="student-count">👥 {classItem.students}</span>
        </div>
      </div>

      <div className="class-info">
        <div className="info-item">
          <span className="info-icon">⏱️</span>
          <div className="info-content">
            <span className="info-label">Time Table</span>
            <span className="info-value">{classItem.timeTable}</span>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">📍</span>
          <div className="info-content">
            <span className="info-label">Place</span>
            <span className="info-value">{classItem.place}</span>
          </div>
        </div>
        <div className="info-item">
          <span className="info-icon">⏳</span>
          <div className="info-content">
            <span className="info-label">Duration</span>
            <span className="info-value">{classItem.duration}</span>
          </div>
        </div>
      </div>

      {classItem.lessons && (
        <div className="lessons-section">
          <h4 className="lessons-title">📚 Lessons:</h4>
          <div className="lessons-list">
            {classItem.lessons.map((lesson, index) => (
              <div key={index} className="lesson-item" style={{ borderLeftColor: classItem.color }}>
                <span className="lesson-number">{index + 1}</span>
                <span className="lesson-name">{lesson}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="class-action">
        <button 
          className="btn-enroll" 
          style={{ background: `linear-gradient(135deg, ${classItem.color} 0%, ${classItem.color}dd 100%)` }}
        >
          Join Class →
        </button>
      </div>
    </div>
  );

  const renderThreeParts = (classes, color) => {
    const timeTableData = classes.map(c => ({ name: c.name, value: c.timeTable, color: c.color }));
    const placesData = classes.map(c => ({ name: c.name, value: c.place, color: c.color }));
    const lessonsData = classes.filter(c => c.lessons).map(c => ({ name: c.name, lessons: c.lessons, color: c.color }));

    return (
      <>
        {/* Class Time Table Part */}
        <div className="parts-section">
          <h3 className="parts-title" style={{ borderLeftColor: color }}>⏱️ Class Time Table</h3>
          <div className="parts-grid">
            {timeTableData.map((item, idx) => (
              <div key={idx} className="part-card" style={{ borderLeftColor: item.color }}>
                <h4 className="part-card-title">{item.name}</h4>
                <p className="part-card-value">{item.value}</p>
                <div className="class-resources">
                  <button className="resource-btn download-btn" style={{ background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}cc 100%)` }}>
                    📥 Download Tutorial
                  </button>
                  <button className="resource-btn recordings-btn" style={{ background: `linear-gradient(135deg, ${item.color}dd 0%, ${item.color}aa 100%)` }}>
                    🎥 Recordings
                  </button>
                  <button className="resource-btn join-btn" style={{ background: `linear-gradient(135deg, ${item.color}bb 0%, ${item.color}88 100%)` }}>
                    🔗 Join Link
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Class Places Part */}
        <div className="parts-section">
          <h3 className="parts-title" style={{ borderLeftColor: color }}>📍 Class Places</h3>
          <div className="parts-grid">
            {placesData.map((item, idx) => (
              <div key={idx} className="part-card" style={{ borderLeftColor: item.color }}>
                <h4 className="part-card-title">{item.name}</h4>
                <p className="part-card-value">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lessons Part */}
        {lessonsData.length > 0 && (
          <div className="parts-section">
            <h3 className="parts-title" style={{ borderLeftColor: color }}>📚 Lessons</h3>
            <div className="lessons-parts-grid">
              {lessonsData.map((item, idx) => (
                <div key={idx} className="lessons-part-card" style={{ borderLeftColor: item.color }}>
                  <h4 className="lessons-part-title">{item.name}</h4>
                  <ul className="lessons-part-list">
                    {item.lessons.map((lesson, lidx) => (
                      <li key={lidx} style={{ color: item.color }}>
                        <span className="lesson-bullet">✓</span> {lesson}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="classes-container">
      <div className="classes-header">
        <h1>📚 All Classes</h1>
        <p>Choose your class type to continue learning</p>
      </div>

      <div className="class-type-selector">
        <button 
          className={`type-btn ${selectedSection === 'theory' ? 'active' : ''}`}
          onClick={() => setSelectedSection('theory')}
          style={{
            borderBottomColor: selectedSection === 'theory' ? '#667eea' : 'transparent',
            color: selectedSection === 'theory' ? '#667eea' : '#7f8c8d'
          }}
        >
          <span className="btn-icon">🎓</span>
          <span className="btn-text">Theory Classes</span>
          <span className="btn-count">{theoryClasses.length}</span>
        </button>
        <button 
          className={`type-btn ${selectedSection === 'revision' ? 'active' : ''}`}
          onClick={() => setSelectedSection('revision')}
          style={{
            borderBottomColor: selectedSection === 'revision' ? '#f5576c' : 'transparent',
            color: selectedSection === 'revision' ? '#f5576c' : '#7f8c8d'
          }}
        >
          <span className="btn-icon">🔄</span>
          <span className="btn-text">Revision Classes</span>
          <span className="btn-count">{revisionClasses.length}</span>
        </button>
        <button 
          className={`type-btn ${selectedSection === 'paper' ? 'active' : ''}`}
          onClick={() => setSelectedSection('paper')}
          style={{
            borderBottomColor: selectedSection === 'paper' ? '#4facfe' : 'transparent',
            color: selectedSection === 'paper' ? '#4facfe' : '#7f8c8d'
          }}
        >
          <span className="btn-icon">📝</span>
          <span className="btn-text">Paper Classes</span>
          <span className="btn-count">{paperClasses.length}</span>
        </button>
      </div>

      <div className="classes-grid">
        {selectedSection === 'theory' && (
          <>
            <div className="section-header" style={{ borderTopColor: '#667eea' }}>
              <h2>🎓 Theory Classes - Conceptual Learning</h2>
              <p>Master the fundamentals with comprehensive theory-based classes</p>
            </div>
            {renderThreeParts(theoryClasses, '#667eea')}
          </>
        )}
        {selectedSection === 'revision' && (
          <>
            <div className="section-header" style={{ borderTopColor: '#f5576c' }}>
              <h2>🔄 Revision Classes - Quick Refresher</h2>
              <p>Revise and strengthen your concepts with focused revision sessions</p>
            </div>
            {renderThreeParts(revisionClasses, '#f5576c')}
          </>
        )}
        {selectedSection === 'paper' && (
          <>
            <div className="section-header" style={{ borderTopColor: '#4facfe' }}>
              <h2>📝 Paper Classes - Exam Preparation</h2>
              <p>Prepare for exams with practice papers and assessment tests</p>
            </div>
            {renderThreeParts(paperClasses, '#4facfe')}
          </>
        )}
      </div>
    </div>
  );
};

export default Courses;
