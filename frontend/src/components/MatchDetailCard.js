import React from 'react';
import { Link } from 'react-router-dom';
import './components.css'; // Optional: Create a CSS file for styling

export const MatchDetailCard = ({ teamName, match }) => {
  if (!match) return null;

  const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
  const otherTeamRoute = `/ipl/team/${otherTeam}`;

  return (
    <div className="match-detail-card">
      <h2>Match Details</h2>
      <div className="match-info">
        <h3 className="teams">
          <Link to={otherTeamRoute} className="team-link">
            {teamName}
          </Link>
          <span className="vs"> vs </span>
          <Link to={otherTeamRoute} className="team-link">
            {otherTeam}
          </Link>
        </h3>
        <p className="match-date">{match.date}</p>
        <p className="match-venue">Venue: {match.venue}</p>
        <p className="match-result">
          <strong>{match.matchWinner}</strong> won by {match.result_margin} ({match.result})
        </p>
      </div>
    </div>
  );
};
