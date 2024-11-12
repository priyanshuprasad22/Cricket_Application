// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ teamName }) => {
  const seasons = Array.from({ length: 15 }, (_, i) => 2023 - i); // Seasons from 2023 to 2009

  return (
    <div className="sidebar">
      <h5 className="sidebar-title">Seasons</h5>
      <ul className="list-group">
        {seasons.map((season) => (
          <li key={season} className="list-group-item">
            <Link to={`/ipl/team/${teamName}/matches/season/${season}`} className="sidebar-link">
              Season {season}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
