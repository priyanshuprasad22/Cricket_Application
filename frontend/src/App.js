import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TeamPage from './pages/TeamPages';
import IPLPage from './pages/IPLPage';
import { MatchPage } from './pages/MatchPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { HomePage } from './pages/HomePage';
import { CricketDashboard } from './pages/CricketDashboard';
import { SeriesDetails } from './pages/SeriesDetail';
import { MatchDetails } from './pages/MatchDetails';
import { Login } from './pages/Login';
import { Register } from './pages/register';
import { Blog } from './pages/Blog.js';
import React, { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token) {
      setIsLoggedIn(true);
      setUserEmail(email);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Header isLoggedIn={isLoggedIn} userEmail={userEmail} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ipl" element={<IPLPage />} />
          <Route path="/ipl/team/:teamName" element={<TeamPage />} />
          <Route path="/ipl/team/:teamName/matches/season/:season" element={<MatchPage />} />
          <Route path="/matches" element={<CricketDashboard />} />
          <Route path="/matches/series/:seriesId" element={<SeriesDetails />} />
          <Route path="/matches/match_info/:matchId" element={<MatchDetails />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserEmail={setUserEmail} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
