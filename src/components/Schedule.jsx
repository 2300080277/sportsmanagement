import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers, FaEdit, FaTrash } from 'react-icons/fa';

const Schedule = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Team Practice",
      date: "2023-06-15",
      time: "18:00",
      location: "Main Stadium",
      team: "Senior Team",
      description: "Regular weekly practice session"
    },
    {
      id: 2,
      title: "Friendly Match",
      date: "2023-06-18",
      time: "15:00",
      location: "City Arena",
      team: "Senior Team",
      description: "Pre-season friendly against City Rivals"
    },
    {
      id: 3,
      title: "Team Meeting",
      date: "2023-06-20",
      time: "19:00",
      location: "Club House",
      team: "All Teams",
      description: "Monthly strategy meeting"
    }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    team: '',
    description: ''
  });

  const [isAdding, setIsAdding] = useState(false);

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      setEvents([...events, { ...newEvent, id: events.length + 1 }]);
      setNewEvent({
        title: '',
        date: '',
        time: '',
        location: '',
        team: '',
        description: ''
      });
      setIsAdding(false);
    }
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Team Schedule</h1>
        <button 
          style={styles.addButton}
          onClick={() => setIsAdding(!isAdding)}
        >
          {isAdding ? 'Cancel' : '+ Add Event'}
        </button>
      </div>

      {isAdding && (
        <div style={styles.addEventForm}>
          <h2 style={styles.formTitle}>Add New Event</h2>
          <div style={styles.formGroup}>
            <label style={styles.label}>Event Title</label>
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              style={styles.input}
              placeholder="Practice, Match, etc."
            />
          </div>
          <div style={styles.formRow}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Date</label>
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Time</label>
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                style={styles.input}
              />
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Location</label>
            <input
              type="text"
              value={newEvent.location}
              onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
              style={styles.input}
              placeholder="Stadium, Field, etc."
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Team</label>
            <select
              value={newEvent.team}
              onChange={(e) => setNewEvent({...newEvent, team: e.target.value})}
              style={styles.input}
            >
              <option value="">Select Team</option>
              <option value="Senior Team">Senior Team</option>
              <option value="Junior Team">Junior Team</option>
              <option value="Women's Team">Women's Team</option>
              <option value="All Teams">All Teams</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              value={newEvent.description}
              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              style={{...styles.input, minHeight: '80px'}}
              placeholder="Additional details..."
            />
          </div>
          <button 
            style={styles.submitButton}
            onClick={handleAddEvent}
          >
            Add Event
          </button>
        </div>
      )}

      <div style={styles.scheduleContainer}>
        {events.length === 0 ? (
          <p style={styles.noEvents}>No events scheduled yet.</p>
        ) : (
          events.map(event => (
            <div key={event.id} style={styles.eventCard}>
              <div style={styles.eventHeader}>
                <h3 style={styles.eventTitle}>{event.title}</h3>
                <div style={styles.eventActions}>
                  <button style={styles.editButton}>
                    <FaEdit size={14} />
                  </button>
                  <button 
                    style={styles.deleteButton}
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              </div>
              <div style={styles.eventDetails}>
                <div style={styles.detailItem}>
                  <FaCalendarAlt style={styles.detailIcon} />
                  <span>{new Date(event.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                </div>
                <div style={styles.detailItem}>
                  <FaClock style={styles.detailIcon} />
                  <span>{event.time}</span>
                </div>
                <div style={styles.detailItem}>
                  <FaMapMarkerAlt style={styles.detailIcon} />
                  <span>{event.location}</span>
                </div>
                <div style={styles.detailItem}>
                  <FaUsers style={styles.detailIcon} />
                  <span>{event.team}</span>
                </div>
              </div>
              {event.description && (
                <p style={styles.eventDescription}>{event.description}</p>
              )}
              <Link 
                to={`/event/${event.id}`} 
                style={styles.viewDetails}
              >
                View Details →
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    color: '#2d3748',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '600',
    color: '#1a365d',
  },
  addButton: {
    backgroundColor: '#4299e1',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    ':hover': {
      backgroundColor: '#3182ce',
    },
  },
  addEventForm: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '2rem',
    marginBottom: '2rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
  },
  formTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#1a365d',
    marginBottom: '1.5rem',
  },
  formRow: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
  },
  formGroup: {
    flex: 1,
    marginBottom: '1rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#4a5568',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #e2e8f0',
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'border-color 0.3s ease',
    ':focus': {
      outline: 'none',
      borderColor: '#4299e1',
    },
  },
  submitButton: {
    backgroundColor: '#48bb78',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '4px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    ':hover': {
      backgroundColor: '#38a169',
    },
  },
  scheduleContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '1.5rem',
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '1.5rem',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
    },
  },
  eventHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  eventTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    color: '#1a365d',
    margin: 0,
  },
  eventActions: {
    display: 'flex',
    gap: '0.5rem',
  },
  editButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#4299e1',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#e53e3e',
    cursor: 'pointer',
    padding: '0.5rem',
  },
  eventDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '0.75rem',
    marginBottom: '1rem',
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#4a5568',
  },
  detailIcon: {
    color: '#718096',
  },
  eventDescription: {
    color: '#4a5568',
    margin: '1rem 0',
    lineHeight: 1.6,
  },
  viewDetails: {
    color: '#4299e1',
    textDecoration: 'none',
    fontWeight: '500',
    display: 'inline-block',
    marginTop: '0.5rem',
    transition: 'color 0.3s ease',
    ':hover': {
      color: '#3182ce',
    },
  },
  noEvents: {
    textAlign: 'center',
    color: '#718096',
    fontStyle: 'italic',
    gridColumn: '1 / -1',
    padding: '2rem',
  },
};

export default Schedule;