import React from 'react';
import './components.css'; // Optional: Create a CSS file for styling

const Loader = () => {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
