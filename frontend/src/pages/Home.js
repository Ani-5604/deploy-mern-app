import React, { useState } from 'react';
import './Home.css'; // Ensure the correct path for CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTicketAlt, faQuestionCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
function Home() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (from && to && date) {
      alert(`Searching buses from ${from} to ${to} on ${date}`);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="container">
      <h1>Smart Bus</h1>
      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="from">From</label>
            <input
              type="text"
              id="from"
              placeholder="Enter Departure Location"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="to">To</label>
            <input
              type="text"
              id="to"
              placeholder="Enter Destination"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="date">Date of Journey</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="search-btn">Search Buses</button>
        </form>
      </div>

      <div className="nav">
        <a href="#" className="nav-item">
          <FontAwesomeIcon icon={faHome} />
          <Link to="/">Home</Link>
        </a>
        <a href="#" className="nav-item">
          <FontAwesomeIcon icon={faTicketAlt} />
          <span>Bookings</span>
        </a>
        <a href="#" className="nav-item">
          <FontAwesomeIcon icon={faQuestionCircle} />
          <span>Help</span>
        </a>
        <a href="#" className="nav-item">
          <FontAwesomeIcon icon={faUser} />
          <Link to="/Signup">Account Sign up/Sign in</Link>
        </a>
      </div>
    </div>
  );
}

export default Home;
