import React, { useState, useEffect } from 'react';
import './TeacherCalendar.css';

const TeacherCalendar = () => {
  const [month, setMonth] = useState(0);
  const [events, setEvents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    eventType: 'assignment', // assignment, deadline, exam, class
    date: ''
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const eventTypes = [
    { value: 'assignment', label: '📝 Assignment', color: '#667eea' },
    { value: 'deadline', label: '⏰ Deadline', color: '#e74c3c' },
    { value: 'exam', label: '✍️ Exam', color: '#f39c12' },
    { value: 'class', label: '👨‍🏫 Class', color: '#27ae60' }
  ];

  // Load events from shared localStorage on mount
  useEffect(() => {
    const savedEvents = localStorage.getItem('lms_calendar_events');
    if (savedEvents) {
      try {
        setEvents(JSON.parse(savedEvents));
      } catch (e) {
        console.error('Error loading events:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save events to shared localStorage whenever they change (after initial load)
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('lms_calendar_events', JSON.stringify(events));
    }
  }, [events, isLoaded]);

  const currentMonth = monthNames[month];
  const currentYear = 2024;
  const daysInMonth = new Date(currentYear, month + 1, 0).getDate();
  const firstDay = new Date(currentYear, month, 1).getDay();

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const handlePrevMonth = () => {
    setMonth(month === 0 ? 11 : month - 1);
  };

  const handleNextMonth = () => {
    setMonth(month === 11 ? 0 : month + 1);
  };

  const handleDayClick = (day) => {
    if (day) {
      setSelectedDay(day);
      setEditingEvent(null);
      setFormData({
        title: '',
        description: '',
        startTime: '09:00',
        endTime: '10:00',
        eventType: 'assignment',
        date: `${currentYear}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      });
      setShowEventModal(true);
    }
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      if (editingEvent) {
        setEvents(events.map(evt => evt.id === editingEvent.id ? { ...formData, id: editingEvent.id } : evt));
      } else {
        const newEvent = {
          ...formData,
          id: Date.now()
        };
        setEvents([...events, newEvent]);
      }
      setShowEventModal(false);
      setEditingEvent(null);
      setSelectedDay(null);
    }
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(events.filter(evt => evt.id !== eventId));
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setFormData(event);
    setShowEventModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const getEventsForDay = (day) => {
    const dateStr = `${currentYear}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(evt => evt.date === dateStr);
  };

  const upcomingEvents = events
    .filter(evt => new Date(evt.date) >= new Date(currentYear, month, 1))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  return (
    <div className="teacher-calendar-page">
      <div className="calendar-page-header">
        <h1>📅 Academic Calendar</h1>
        <p>Manage your classes, assignments, exams, and deadlines</p>
      </div>

      <div className="teacher-calendar-container">
        <div className="calendar-main-section">
          <div className="calendar-section">
            <div className="section-header">
              <button className="month-nav-btn" onClick={handlePrevMonth}>←</button>
              <h2>{currentMonth} {currentYear}</h2>
              <button className="month-nav-btn" onClick={handleNextMonth}>→</button>
            </div>

            <div className="calendar">
              <div className="calendar-header">
                <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
              </div>
              <div className="calendar-grid">
                {calendarDays.map((day, index) => {
                  const dayEvents = day ? getEventsForDay(day) : [];
                  return (
                    <div
                      key={index}
                      className={`calendar-day ${day ? 'active' : 'empty'} ${dayEvents.length > 0 ? 'has-events' : ''}`}
                      onClick={() => handleDayClick(day)}
                    >
                      {day && (
                        <>
                          <span className="day-number">{day}</span>
                          {dayEvents.length > 0 && (
                            <div className="day-events-preview">
                              {dayEvents.slice(0, 2).map((evt, i) => (
                                <div key={i} className={`event-dot event-${evt.eventType}`} title={evt.title}></div>
                              ))}
                              {dayEvents.length > 2 && <span className="more-events">+{dayEvents.length - 2}</span>}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="calendar-sidebar">
          <div className="events-section">
            <div className="section-header">
              <h2>📌 Upcoming Events</h2>
            </div>
            <div className="events-list">
              {upcomingEvents.length === 0 ? (
                <div className="no-events">No upcoming events</div>
              ) : (
                upcomingEvents.map((event) => {
                  const eventType = eventTypes.find(t => t.value === event.eventType);
                  return (
                    <div key={event.id} className="event-item" style={{ borderLeftColor: eventType?.color }}>
                      <div className="event-header">
                        <h4>{event.title}</h4>
                        <span className="event-badge">{eventType?.label.split(' ')[0]}</span>
                      </div>
                      <p className="event-date">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      <p className="event-time">{event.startTime} - {event.endTime}</p>
                      {event.description && <p className="event-desc">{event.description}</p>}
                      <div className="event-actions">
                        <button className="edit-btn" onClick={() => handleEditEvent(event)}>✏️ Edit</button>
                        <button className="delete-btn" onClick={() => handleDeleteEvent(event.id)}>🗑️ Delete</button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="legend-section">
            <div className="section-header">
              <h2>📋 Event Types</h2>
            </div>
            <div className="legend">
              {eventTypes.map(type => (
                <div key={type.value} className="legend-item">
                  <div className="legend-color" style={{ backgroundColor: type.color }}></div>
                  <span>{type.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <div className="modal-overlay" onClick={() => setShowEventModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingEvent ? '✏️ Edit Event' : '➕ Add Event'}</h2>
              <button className="close-btn" onClick={() => setShowEventModal(false)}>✕</button>
            </div>

            <form onSubmit={handleAddEvent} className="event-form">
              <div className="form-group">
                <label htmlFor="title">Event Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="e.g., React Assignment Due"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="eventType">Event Type *</label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleFormChange}
                >
                  {eventTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="date">Date *</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startTime">Start Time *</label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endTime">End Time *</label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Add more details about this event..."
                  rows="3"
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowEventModal(false)}>Cancel</button>
                <button type="submit" className="submit-btn">{editingEvent ? 'Update Event' : 'Add Event'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherCalendar;
