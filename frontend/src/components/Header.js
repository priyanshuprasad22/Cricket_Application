import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import './components.css';

const Header = ({ isLoggedIn, userEmail, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <header className="global-header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand logo">Sports League</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/matches" className="nav-link">Matches</Link>
              </li>
              <li className="nav-item">
                <Link to="/ipl" className="nav-link">IPL</Link>
              </li>
              <li className="nav-item">
                <Link to="/blog" className="nav-link">Blog</Link>
              </li>
              {isLoggedIn ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link" style={{ cursor: 'default', color: 'blue' }}>
                      {userEmail}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button onClick={handleLogout} className="btn btn-link nav-link" style={{ color: 'red' }}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
