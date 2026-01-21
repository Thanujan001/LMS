import React, { useState } from 'react';
import './Progress.css';

const Progress = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [activeTab, setActiveTab] = useState('timetable');
  const [newTimetableItem, setNewTimetableItem] = useState({
    time: '',
    subject: '',
    instructor: '',
    location: '',
    type: 'Lecture'
  });
  const [editingTimetableIndex, setEditingTimetableIndex] = useState(null);
  const [editingStudyHourIndex, setEditingStudyHourIndex] = useState(null);
  const [editingMarksIndex, setEditingMarksIndex] = useState(null);
  const [editingGradingIndex, setEditingGradingIndex] = useState(null);

  const [timetableData, setTimetableData] = useState({
    Monday: [
      { time: '09:00 - 10:00', subject: 'React Development', instructor: 'Dr. Sarah Smith', location: 'Room 101', type: 'Lecture' },
      { time: '10:30 - 11:30', subject: 'JavaScript Fundamentals', instructor: 'Prof. Mike Johnson', location: 'Lab 202', type: 'Practical' },
      { time: '13:00 - 14:00', subject: 'Web Design Principles', instructor: 'Ms. Emily Davis', location: 'Room 305', type: 'Lecture' },
      { time: '14:30 - 15:30', subject: 'Database Design', instructor: 'Dr. Alex Chen', location: 'Lab 101', type: 'Practical' }
    ],
    Tuesday: [
      { time: '09:00 - 10:00', subject: 'Python for Data Science', instructor: 'Dr. Alex Chen', location: 'Lab 202', type: 'Practical' },
      { time: '11:00 - 12:00', subject: 'UI/UX Design', instructor: 'Ms. Emily Davis', location: 'Room 305', type: 'Lecture' },
      { time: '13:30 - 14:30', subject: 'React Development', instructor: 'Dr. Sarah Smith', location: 'Lab 101', type: 'Practical' }
    ],
    Wednesday: [
      { time: '09:00 - 10:00', subject: 'Digital Marketing', instructor: 'Ms. Lisa Brown', location: 'Room 202', type: 'Lecture' },
      { time: '10:30 - 11:30', subject: 'Database Design', instructor: 'Dr. Alex Chen', location: 'Lab 202', type: 'Practical' },
      { time: '14:00 - 15:00', subject: 'JavaScript Fundamentals', instructor: 'Prof. Mike Johnson', location: 'Room 101', type: 'Lecture' }
    ],
    Thursday: [
      { time: '09:00 - 10:00', subject: 'Web Design Principles', instructor: 'Ms. Emily Davis', location: 'Room 305', type: 'Lecture' },
      { time: '10:30 - 11:30', subject: 'React Development', instructor: 'Dr. Sarah Smith', location: 'Lab 101', type: 'Practical' },
      { time: '13:00 - 14:00', subject: 'Python for Data Science', instructor: 'Dr. Alex Chen', location: 'Lab 202', type: 'Practical' }
    ],
    Friday: [
      { time: '09:00 - 10:00', subject: 'JavaScript Fundamentals', instructor: 'Prof. Mike Johnson', location: 'Lab 202', type: 'Practical' },
      { time: '10:30 - 11:30', subject: 'UI/UX Design', instructor: 'Ms. Emily Davis', location: 'Room 202', type: 'Lecture' },
      { time: '13:00 - 14:00', subject: 'Digital Marketing', instructor: 'Ms. Lisa Brown', location: 'Room 101', type: 'Lecture' }
    ]
  });

  // Study Hours Data
  const [studyHoursData, setStudyHoursData] = useState([
    { day: 'Mon', hours: 4 },
    { day: 'Tue', hours: 3 },
    { day: 'Wed', hours: 5 },
    { day: 'Thu', hours: 2 },
    { day: 'Fri', hours: 6 },
    { day: 'Sat', hours: 7 },
    { day: 'Sun', hours: 3 }
  ]);

  // Paper Marks Data
  const [paperMarksData, setPaperMarksData] = useState([
    { paper: 'Paper 1', marks: 78, maxMarks: 100 },
    { paper: 'Paper 2', marks: 85, maxMarks: 100 },
    { paper: 'Paper 3', marks: 92, maxMarks: 100 },
    { paper: 'Paper 4', marks: 88, maxMarks: 100 },
    { paper: 'Paper 5', marks: 76, maxMarks: 100 }
  ]);

  // Grading Data
  const [gradingData, setGradingData] = useState([
    { id: 1, title: 'React Component Project', marks: 92, feedback: 'Excellent work! Great understanding of hooks.', grade: 'A+' },
    { id: 2, title: 'JavaScript Quiz', marks: 85, feedback: 'Good performance. Review async/await concepts.', grade: 'A' },
    { id: 3, title: 'Design Portfolio', marks: 78, feedback: 'Good effort. Improve typography choices.', grade: 'B+' },
    { id: 4, title: 'Database Project', marks: 88, feedback: 'Well structured queries. Optimize indexes.', grade: 'A' }
  ]);

  const days = Object.keys(timetableData);

  const handleAddTimetable = () => {
    if (newTimetableItem.time && newTimetableItem.subject) {
      setTimetableData({
        ...timetableData,
        [selectedDay]: [...timetableData[selectedDay], newTimetableItem]
      });
      setNewTimetableItem({ time: '', subject: '', instructor: '', location: '', type: 'Lecture' });
    }
  };

  const handleDeleteTimetable = (index) => {
    setTimetableData({
      ...timetableData,
      [selectedDay]: timetableData[selectedDay].filter((_, i) => i !== index)
    });
    setEditingTimetableIndex(null);
  };

  const handleUpdateStudyHours = (index, hours) => {
    const updated = [...studyHoursData];
    updated[index].hours = parseInt(hours);
    setStudyHoursData(updated);
    setEditingStudyHourIndex(null);
  };

  const getGradeColor = (grade) => {
    if (grade.includes('A+') || grade.includes('A')) return '#27ae60';
    if (grade.includes('B')) return '#f39c12';
    if (grade.includes('C')) return '#e67e22';
    return '#e74c3c';
  };

  const maxStudyHours = Math.max(...studyHoursData.map(d => d.hours));

  return (
    <div className="progress">
      <div className="progress-header">
        <h1>📈 Progress & Tracking</h1>
        <p>Create timetables, track study hours, view paper marks, and grading</p>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-navigation">
        <button
          className={`tab-link ${activeTab === 'timetable' ? 'active' : ''}`}
          onClick={() => setActiveTab('timetable')}
        >
          📅 Timetable
        </button>
        <button
          className={`tab-link ${activeTab === 'studyHours' ? 'active' : ''}`}
          onClick={() => setActiveTab('studyHours')}
        >
          📊 Study Hours
        </button>
        <button
          className={`tab-link ${activeTab === 'paperMarks' ? 'active' : ''}`}
          onClick={() => setActiveTab('paperMarks')}
        >
          📈 Paper Marks
        </button>
        <button
          className={`tab-link ${activeTab === 'grading' ? 'active' : ''}`}
          onClick={() => setActiveTab('grading')}
        >
          ⭐ Grading
        </button>
      </div>

      {/* Timetable Tab */}
      {activeTab === 'timetable' && (
        <div className="progress-section">
          <h2>📅 Create & View Timetable</h2>
          
          {/* Add New Timetable Entry */}
          <div className="add-timetable-form">
            <h3>Add New Class</h3>
            <div className="form-grid">
              <input
                type="text"
                placeholder="Time (e.g., 09:00 - 10:00)"
                value={newTimetableItem.time}
                onChange={(e) => setNewTimetableItem({ ...newTimetableItem, time: e.target.value })}
              />
              <input
                type="text"
                placeholder="Subject"
                value={newTimetableItem.subject}
                onChange={(e) => setNewTimetableItem({ ...newTimetableItem, subject: e.target.value })}
              />
              <input
                type="text"
                placeholder="Instructor"
                value={newTimetableItem.instructor}
                onChange={(e) => setNewTimetableItem({ ...newTimetableItem, instructor: e.target.value })}
              />
              <input
                type="text"
                placeholder="Location"
                value={newTimetableItem.location}
                onChange={(e) => setNewTimetableItem({ ...newTimetableItem, location: e.target.value })}
              />
              <select
                value={newTimetableItem.type}
                onChange={(e) => setNewTimetableItem({ ...newTimetableItem, type: e.target.value })}
              >
                <option value="Lecture">Lecture</option>
                <option value="Practical">Practical</option>
                <option value="Tutorial">Tutorial</option>
              </select>
              <button className="add-btn" onClick={handleAddTimetable}>Add Class</button>
            </div>
          </div>

          {/* Timetable Display */}
          <div className="timetable-container">
            <div className="day-selector">
              {days.map((day) => (
                <button
                  key={day}
                  className={`day-btn ${selectedDay === day ? 'active' : ''}`}
                  onClick={() => setSelectedDay(day)}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="timetable-list">
              {timetableData[selectedDay]?.length > 0 ? (
                timetableData[selectedDay].map((lesson, index) => (
                  <div key={index} className="timetable-item">
                    {editingTimetableIndex === index ? (
                      <div className="edit-form">
                        <input
                          type="text"
                          placeholder="Time"
                          value={lesson.time}
                          onChange={(e) => setTimetableData({
                            ...timetableData,
                            [selectedDay]: timetableData[selectedDay].map((item, i) => 
                              i === index ? { ...item, time: e.target.value } : item
                            )
                          })}
                        />
                        <input
                          type="text"
                          placeholder="Subject"
                          value={lesson.subject}
                          onChange={(e) => setTimetableData({
                            ...timetableData,
                            [selectedDay]: timetableData[selectedDay].map((item, i) => 
                              i === index ? { ...item, subject: e.target.value } : item
                            )
                          })}
                        />
                        <input
                          type="text"
                          placeholder="Instructor"
                          value={lesson.instructor}
                          onChange={(e) => setTimetableData({
                            ...timetableData,
                            [selectedDay]: timetableData[selectedDay].map((item, i) => 
                              i === index ? { ...item, instructor: e.target.value } : item
                            )
                          })}
                        />
                        <input
                          type="text"
                          placeholder="Location"
                          value={lesson.location}
                          onChange={(e) => setTimetableData({
                            ...timetableData,
                            [selectedDay]: timetableData[selectedDay].map((item, i) => 
                              i === index ? { ...item, location: e.target.value } : item
                            )
                          })}
                        />
                        <div className="edit-actions">
                          <button className="save-btn" onClick={() => setEditingTimetableIndex(null)}>Save</button>
                          <button className="delete-btn" onClick={() => handleDeleteTimetable(index)}>Delete</button>
                          <button className="cancel-btn" onClick={() => setEditingTimetableIndex(null)}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="time-slot">{lesson.time}</div>
                        <div className="lesson-details">
                          <h3>{lesson.subject}</h3>
                          <p className="instructor">👨‍🏫 {lesson.instructor}</p>
                          <p className="location">📍 {lesson.location}</p>
                        </div>
                        <div className={`lesson-type ${lesson.type.toLowerCase()}`}>
                          {lesson.type}
                        </div>
                        <button className="edit-icon-btn" onClick={() => setEditingTimetableIndex(index)}>✏️</button>
                      </>
                    )}
                  </div>
                ))
              ) : (
                <p className="no-data">No classes scheduled for {selectedDay}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Study Hours Graph Tab */}
      {activeTab === 'studyHours' && (
        <div className="progress-section">
          <h2>📊 Study Hours Graph</h2>
          <div className="graph-container">
            <div className="bar-chart">
              {studyHoursData.map((data, index) => (
                <div key={index} className="bar-item">
                  {editingStudyHourIndex === index ? (
                    <div className="edit-hours">
                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={data.hours}
                        onChange={(e) => handleUpdateStudyHours(index, e.target.value)}
                      />
                      <button className="save-btn" onClick={() => setEditingStudyHourIndex(null)}>Save</button>
                    </div>
                  ) : (
                    <>
                      <div className="bar-label" onClick={() => setEditingStudyHourIndex(index)}>{data.day}</div>
                      <div className="bar-wrapper">
                        <div
                          className="bar-fill"
                          style={{
                            height: `${(data.hours / maxStudyHours) * 200}px`,
                            backgroundColor: data.hours > 5 ? '#27ae60' : data.hours > 3 ? '#3498db' : '#e74c3c'
                          }}
                          title={`${data.hours} hours`}
                        ></div>
                      </div>
                      <div className="bar-value" onClick={() => setEditingStudyHourIndex(index)}>{data.hours}h</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="stats-summary">
            <div className="stat">
              <span className="stat-label">Total Hours:</span>
              <span className="stat-value">{studyHoursData.reduce((sum, d) => sum + d.hours, 0)} hours</span>
            </div>
            <div className="stat">
              <span className="stat-label">Average Hours:</span>
              <span className="stat-value">{(studyHoursData.reduce((sum, d) => sum + d.hours, 0) / 7).toFixed(1)} hours</span>
            </div>
            <div className="stat">
              <span className="stat-label">Peak Day:</span>
              <span className="stat-value">{studyHoursData.reduce((max, d) => d.hours > max.hours ? d : max).day}</span>
            </div>
          </div>
        </div>
      )}

      {/* Paper Marks Graph Tab */}
      {activeTab === 'paperMarks' && (
        <div className="progress-section">
          <h2>📈 Paper Marks Performance</h2>
          <div className="marks-container">
            {paperMarksData.map((paper, index) => {
              const percentage = (paper.marks / paper.maxMarks) * 100;
              const color = percentage >= 90 ? '#27ae60' : percentage >= 75 ? '#3498db' : percentage >= 60 ? '#f39c12' : '#e74c3c';
              return (
                <div key={index} className="marks-item">
                  {editingMarksIndex === index ? (
                    <div className="edit-form">
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Paper Name</label>
                          <input 
                            type="text" 
                            value={paper.paper}
                            disabled
                            style={{opacity: 0.6}}
                          />
                        </div>
                        <div className="form-group">
                          <label>Marks</label>
                          <input 
                            type="number" 
                            min="0" 
                            max={paper.maxMarks}
                            value={paper.marks}
                            onChange={(e) => {
                              const newMarks = Math.min(Math.max(0, parseInt(e.target.value) || 0), paper.maxMarks);
                              const updatedData = [...paperMarksData];
                              updatedData[index].marks = newMarks;
                              setPaperMarksData(updatedData);
                            }}
                          />
                        </div>
                        <div className="form-group">
                          <label>Max Marks</label>
                          <input 
                            type="number" 
                            value={paper.maxMarks}
                            disabled
                            style={{opacity: 0.6}}
                          />
                        </div>
                      </div>
                      <div className="edit-actions">
                        <button className="save-btn" onClick={() => {
                          setEditingMarksIndex(null);
                        }}>Save</button>
                        <button className="cancel-btn" onClick={() => {
                          setEditingMarksIndex(null);
                        }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="marks-header">
                        <span className="marks-label" onClick={() => setEditingMarksIndex(index)} style={{cursor: 'pointer'}}>
                          {paper.paper} ✏️
                        </span>
                        <span className="marks-score" onClick={() => setEditingMarksIndex(index)} style={{cursor: 'pointer'}}>
                          {paper.marks}/{paper.maxMarks}
                        </span>
                      </div>
                      <div className="marks-bar-wrapper">
                        <div
                          className="marks-bar-fill"
                          style={{
                            width: `${percentage}%`,
                            backgroundColor: color
                          }}
                        ></div>
                      </div>
                      <div className="marks-percentage">{percentage.toFixed(0)}%</div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Grading Tab */}
      {activeTab === 'grading' && (
        <div className="progress-section">
          <h2>⭐ Paper Grading & Feedback</h2>
          <div className="grading-container">
            {gradingData.map((item, index) => (
              <div key={item.id} className="grading-card">
                {editingGradingIndex === index ? (
                  <div className="edit-form">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Title</label>
                        <input 
                          type="text" 
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...gradingData];
                            updated[index].title = e.target.value;
                            setGradingData(updated);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Marks</label>
                        <input 
                          type="number" 
                          min="0" 
                          max="100"
                          value={item.marks}
                          onChange={(e) => {
                            const updated = [...gradingData];
                            updated[index].marks = Math.min(100, Math.max(0, parseInt(e.target.value) || 0));
                            setGradingData(updated);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <label>Grade</label>
                        <select 
                          value={item.grade}
                          onChange={(e) => {
                            const updated = [...gradingData];
                            updated[index].grade = e.target.value;
                            setGradingData(updated);
                          }}
                        >
                          <option>A+</option>
                          <option>A</option>
                          <option>B+</option>
                          <option>B</option>
                          <option>C</option>
                          <option>D</option>
                          <option>F</option>
                        </select>
                      </div>
                      <div className="form-group" style={{gridColumn: '1 / -1'}}>
                        <label>Feedback</label>
                        <textarea 
                          value={item.feedback}
                          onChange={(e) => {
                            const updated = [...gradingData];
                            updated[index].feedback = e.target.value;
                            setGradingData(updated);
                          }}
                          rows="3"
                        />
                      </div>
                    </div>
                    <div className="edit-actions">
                      <button className="save-btn" onClick={() => setEditingGradingIndex(null)}>Save</button>
                      <button className="cancel-btn" onClick={() => setEditingGradingIndex(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grading-header" onClick={() => setEditingGradingIndex(index)} style={{cursor: 'pointer'}}>
                      <h3>{item.title} ✏️</h3>
                      <div className="grade-badge" style={{ backgroundColor: getGradeColor(item.grade) }}>
                        {item.grade}
                      </div>
                    </div>
                    <div className="marks-display">
                      <span className="marks">{item.marks}/100</span>
                    </div>
                    <div className="feedback-section">
                      <label>Feedback:</label>
                      <p>{item.feedback}</p>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Progress;
