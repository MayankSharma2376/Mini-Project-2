import React, { useState } from 'react';

const Pickup = () => {
  // State for form data
  const [formData, setFormData] = useState({
    fullName: '',
    location: '',
    date: '',
    time: '',
    message: ''
  });

  // State for modal visibility and message
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Handles input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    // Show a success message in the modal
    setModalMessage(`Thank you, ${formData.fullName}! Your pickup has been scheduled for ${formData.date} at ${formData.time}.`);
    setIsModalOpen(true);
    // Reset form fields
    setFormData({
      fullName: '',
      location: '',
      date: '',
      time: '',
      message: ''
    });
  };

  // Closes the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  // Inline style for the background image
  const sectionStyle = {
    backgroundImage: "url('/pickup.jpg')",
  };

  return (
    <>
      <section 
        id="pickup" 
        className="relative min-h-screen bg-cover bg-center flex items-center justify-center p-4"
        style={sectionStyle}
      >
        <div className="absolute inset-0 bg-black/60"></div> {/* Dark overlay */}
        
        <div className="relative z-10 bg-black/40 backdrop-blur-sm p-6 sm:p-8 md:p-10 rounded-2xl w-full max-w-5xl text-white shadow-lg">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
            Schedule a Pickup
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Responsive grid for inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="text"
                name="location"
                placeholder="Your Location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full p-3 bg-white/20 border border-white/30 rounded-lg placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <textarea
              name="message"
              placeholder="Additional details (e.g., type of waste, quantity)"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 bg-white/20 border border-white/30 rounded-lg placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            ></textarea>

            <div className="text-center mt-6">
              <button 
                type="submit" 
                className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 hover:bg-green-700 hover:scale-105"
              >
                Order Pickup
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Success!</h3>
            <p className="text-gray-600 mb-6">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 hover:bg-green-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Pickup;
