import React, { useState, useEffect } from 'react';
import './Courses.css';
import { useAuth } from '../../contexts/AuthContext';
import { fetchClasses, addClass, updateClass, deleteClass } from '../../utils/api';

const Courses = () => {
  const { user } = useAuth();
  const isTeacher = user?.role === 'teacher' || user?.role === 'admin';

  const [selectedSection, setSelectedSection] = useState('theory');
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    instructor: user?.name || '',
    type: 'theory',
    lessons: '',
    timeTable: '',
    place: '',
    duration: '',
    students: 0,
    color: '#667eea'
  });

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      setLoading(true);
      const data = await fetchClasses();
      setClasses(data);
      setError(null);
    } catch (err) {
      setError('Failed to load classes. Please make sure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const theoryClasses = classes.filter(c => c.type === 'theory');
  const revisionClasses = classes.filter(c => c.type === 'revision');
  const paperClasses = classes.filter(c => c.type === 'paper');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpenModal = (cls = null) => {
    if (cls) {
      setEditingClass(cls);
      setFormData({
        ...cls,
        lessons: cls.lessons.join(', ')
      });
    } else {
      setEditingClass(null);
      setFormData({
        name: '',
        instructor: user?.name || '',
        type: 'theory',
        lessons: '',
        timeTable: '',
        place: '',
        duration: '',
        students: 0,
        color: '#667eea'
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      lessons: formData.lessons.split(',').map(l => l.trim()).filter(l => l !== '')
    };

    try {
      if (editingClass) {
        await updateClass(editingClass._id, payload, user.role);
      } else {
        await addClass(payload, user.role);
      }
      setShowModal(false);
      loadClasses();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await deleteClass(id, user.role);
        loadClasses();
      } catch (err) {
        alert(err.message);
      }
    }
  };

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
                {isTeacher && (
                  <div className="admin-actions">
                    <button className="edit-btn" onClick={() => handleOpenModal(classes.find(c => c.name === item.name))}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(classes.find(c => c.name === item.name)._id)}>Delete</button>
                  </div>
                )}
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
        {isTeacher && (
          <button className="add-class-btn" onClick={() => handleOpenModal()}>
            ➕ Add New Class
          </button>
        )}
      </div>

      {loading && <div className="loading-spinner">Loading classes...</div>}
      {error && <div className="error-message">{error}</div>}

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

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingClass ? 'Edit Class' : 'Add New Class'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Class Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Instructor</label>
                <input type="text" name="instructor" value={formData.instructor} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select name="type" value={formData.type} onChange={handleInputChange}>
                  <option value="theory">Theory</option>
                  <option value="revision">Revision</option>
                  <option value="paper">Paper</option>
                </select>
              </div>
              <div className="form-group">
                <label>Time Table</label>
                <input type="text" name="timeTable" value={formData.timeTable} onChange={handleInputChange} placeholder="e.g. Mon, Wed - 10:00 AM" />
              </div>
              <div className="form-group">
                <label>Place</label>
                <input type="text" name="place" value={formData.place} onChange={handleInputChange} placeholder="e.g. Room 201" />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} placeholder="e.g. 12 weeks" />
              </div>
              <div className="form-group">
                <label>Lessons (comma separated)</label>
                <input type="text" name="lessons" value={formData.lessons} onChange={handleInputChange} placeholder="Lesson 1, Lesson 2" />
              </div>
              <div className="form-group">
                <label>Theme Color</label>
                <input type="color" name="color" value={formData.color} onChange={handleInputChange} />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="submit-btn">{editingClass ? 'Update Class' : 'Create Class'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;

//this