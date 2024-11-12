import React from 'react';
import { Link } from 'react-router-dom';
import './components.css';

export const TeamSidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">IPL Teams</h2>
      <Link to='/ipl/team/Chennai%20Super%20Kings' className="team-link">Chennai Super Kings</Link>
      <Link to='/ipl/team/Mumbai%20Indians' className="team-link">Mumbai Indians</Link>
      <Link to='/ipl/team/Royal%20Challenger%20Bengalore' className="team-link">Royal Challengers Bangalore</Link>
      <Link to='/ipl/team/Delhi%20Capitals' className="team-link">Delhi Capitals</Link>
      <Link to='/ipl/team/Kolkata%20Knight%20Riders' className="team-link">Kolkata Knight Riders</Link>
      <Link to='/ipl/team/Sunrisers%20Hyderabad' className="team-link">Sunrisers Hyderabad</Link>
      <Link to='/ipl/team/Rajasthan%20Royals' className="team-link">Rajasthan Royals</Link>
      <Link to='/ipl/team/Gujarat%20Titans' className="team-link">Gujarat Titans</Link>
      <Link to='/ipl/team/Kings%20XI%20Punjab' className="team-link">Kings XI Punjab</Link>
      <Link to='/ipl/team/Lucknow%20Super%20Giants' className="team-link">Lucknow Super Giants</Link>
    </div>
  );
};
