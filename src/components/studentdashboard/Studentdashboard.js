import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Studentdashboard = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([
    {
      title: 'Event 1',
      description: 'Description for event 1.',
      date: '2024-07-01',
      reminderSet: false,
    },
    {
      title: 'Event 2',
      description: 'Description for event 2.',
      date: '2024-07-05',
      reminderSet: false,
    },
    {
      title: 'Event 3',
      description: 'Description for event 3.',
      date: '2024-07-10',
      reminderSet: false,
    },
    {
      title: 'Event 4',
      description: 'Description for event 4.',
      date: '2024-07-10',
      reminderSet: false,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest'); // 'latest' or 'oldest'

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleReminderSet = (index) => {
    const updatedEvents = [...events];
    const filteredIndex = events.findIndex(event => event.title === filteredEvents[index].title);
    updatedEvents[filteredIndex].reminderSet = true;
    setEvents(updatedEvents);
    alert(`Reminder set for ${events[filteredIndex].title}`);
  };

  const sortEvents = () => {
    const sortedEvents = [...events];
    if (sortBy === 'latest') {
      sortedEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'oldest') {
      sortedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return sortedEvents;
  };

  const filteredEvents = sortEvents().filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // Responsive grid columns
    gap: '20px', // Gap between grid items
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 120px)', // Adjusted for navbar and footer height
    padding: '20px', // Padding around the grid
    marginTop: '100px',
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'transform 0.3s',
    height: '250px',
    width: '100%', // Cards take full width of the grid cell
    maxWidth: '300px', // Maximum width of each card
    boxSizing: 'border-box', // Include padding and border in width/height calculation
  };

  const cardImgStyle = {
    width: '150px',
    height: '150px',
    marginBottom: '10px',
    borderRadius: '50%',
  };

  const cardTextStyle = {
    margin: '0',
    fontFamily: 'Times New Roman, Times, serif',
    fontSize: 'large',
  };

  const navbarStyle = {
    backgroundColor: 'black',
    padding: '10px 20px',
    textAlign: 'center',
    color: 'white',
    marginBottom: '20px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    fontFamily: 'times new roman',
  };

  const footerStyle = {
    backgroundColor: 'black',
    padding: '20px',
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    color: 'white',
  };

  const pageStyle = {
    overflowX: 'hidden', // Hide horizontal overflow
  };

  return (
    <div style={pageStyle}>
      <div className="navbar" style={navbarStyle}>
        <h1>STUDENT DASHBOARD</h1>
        <div>
          <label style={{ color: 'white', marginRight: '10px' }}>Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '5px', fontSize: '16px' }}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>
      </div>
      <div className="container" style={cardContainerStyle}>
        {filteredEvents.map((event, index) => (
          <div key={index} style={cardStyle} onClick={() => console.log(`Clicked on ${event.title}`)}>
            <div style={cardImgStyle}>{/* Add your event image here */}</div>
            <div className="card-text" style={cardTextStyle}>
              <p>{event.title}</p>
              <p>{event.date}</p>
              <p>{event.description}</p>
              {!event.reminderSet && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReminderSet(index);
                  }}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: 'green',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    marginTop: '10px',
                    cursor: 'pointer',
                  }}
                >
                  Set Reminder
                </button>
              )}
              {event.reminderSet && <p>Reminder Set!</p>}
            </div>
          </div>
        ))}
      </div>
      <footer style={footerStyle}>
        <p>&copy; 2024 ST.BHATEVERA. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Studentdashboard;