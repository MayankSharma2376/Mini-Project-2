import React, { useState } from 'react';

const Pickup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    location: '',
    date: '',
    time: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert('Pickup scheduled successfully!');
  };

  // Styles
  const sectionStyle = {
    backgroundImage: "url('/pickup.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem'
  };

  const formContainer = {
    backgroundColor: 'rgba(0,0,0,0.4)', // overlay
    padding: '3rem',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '1100px', // larger width
    textAlign: 'center',
    color: '#fff'
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: '1rem',
    gap: '10px'
  };

  const inputStyle = {
    flex: '1',
    padding: '14px',
    borderRadius: '8px',
    border: 'none',
    outline: 'none',
    fontSize: '1rem',
    minWidth: '200px'
  };

  const textareaStyle = {
    width: '100%',
    padding: '14px',
    margin: '10px 0',
    borderRadius: '8px',
    border: 'none',
    outline: 'none',
    fontSize: '1rem',
    resize: 'none'
  };

  const buttonStyle = {
    backgroundColor: '#2e7d32',
    color: '#fff',
    border: 'none',
    padding: '14px 30px',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem'
  };

  return (
    <section style={sectionStyle} id="pickup">
      <div style={formContainer}>
        <h2 style={{ marginBottom: '2rem', fontSize: '2.2rem', fontWeight: '700' }}>
          Schedule Pickup
        </h2>
        <form onSubmit={handleSubmit}>
          {/* One row with 4 inputs */}
          <div style={rowStyle}>
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Message below full width */}
          <textarea
            name="message"
            placeholder="Message..."
            value={formData.message}
            onChange={handleChange}
            rows="4"
            style={textareaStyle}
          ></textarea>

          <button type="submit" style={buttonStyle}>Order Pickup</button>
        </form>
      </div>
    </section>
  );
};

export default Pickup;
