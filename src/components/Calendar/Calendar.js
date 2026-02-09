import React, { useState, useEffect } from 'react';
import './Calendar.css';

const Calendar = ({ isFullPage = false }) => {
  const [month, setMonth] = useState(0);
  const [events, setEvents] = useState([]);
  
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

  // Load events from shared localStorage
  useEffect(() => {
    const loadEvents = () => {
      const savedEvents = localStorage.getItem('lms_calendar_events');
      if (savedEvents) {
        try {
          setEvents(JSON.parse(savedEvents));
        } catch (e) {
          console.error('Error loading events:', e);
          setEvents([]);
        }
      }
    };

    loadEvents();

    // Listen for storage changes (when teacher updates calendar)
    const handleStorageChange = (e) => {
      if (e.key === 'lms_calendar_events') {
        loadEvents();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

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

  const getEventsForDay = (day) => {
    if (!day) return [];
    const dateStr = `${currentYear}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(evt => evt.date === dateStr);
  };

  const upcomingEvents = events
    .filter(evt => new Date(evt.date) >= new Date(currentYear, month, 1))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6);

  const handlePrevMonth = () => {
    setMonth(month === 0 ? 11 : month - 1);
  };

  const handleNextMonth = () => {
    setMonth(month === 11 ? 0 : month + 1);
  };

  if (isFullPage) {
    return (
      <div className="calendar-page">
        <div className="calendar-page-header">
          <h1>📅 Calendar</h1>
          <p>Plan your learning activities</p>
        </div>

        <div className="calendar-container">
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
                  const dayEvents = getEventsForDay(day);
                  return (
                    <div
                      key={index}
                      className={`calendar-day ${day ? 'active' : 'empty'} ${dayEvents.length > 0 ? 'has-event' : ''}`}
                    >
                      {day && (
                        <>
                          <span className="day-number">{day}</span>
                          {dayEvents.length > 0 && (
                            <div className="day-events-indicators">
                              {dayEvents.slice(0, 2).map((evt, i) => {
                                const eventType = eventTypes.find(t => t.value === evt.eventType);
                                return <div key={i} className="event-indicator" style={{ backgroundColor: eventType?.color }} title={evt.title}></div>;
                              })}
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

          <div className="calendar-events">
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
                    <div key={event.id} className="event-item">
                      <div className="event-title">{event.title}</div>
                      <div className="event-date">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                      <div className="event-type">{eventType?.label}</div>
                      {event.description && <div className="event-description">{event.description}</div>}
                      <div className="event-time">{event.startTime} - {event.endTime}</div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard version (compact)
  return (
    <div className="dashboard-section calendar-section">
      <div className="section-header">
        <h2>📅 Calendar</h2>
        <span className="month-year">{currentMonth} 2024</span>
      </div>
      <div className="calendar">
        <div className="calendar-header">
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>
        <div className="calendar-grid">
          {calendarDays.map((day, index) => {
            const dayEvents = getEventsForDay(day);
            return (
              <div
                key={index}
                className={`calendar-day ${day ? 'active' : 'empty'} ${dayEvents.length > 0 ? 'has-event' : ''}`}
              >
                {day && (
                  <>
                    <span className="day-number">{day}</span>
                    {dayEvents.length > 0 && <div className="event-indicator"></div>}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
