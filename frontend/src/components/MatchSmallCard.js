import React from 'react';
import { Link } from 'react-router-dom';

import './components.css';

export const MatchSmallCard = ({ match, teamName }) => {
  if (!match) return null;

  const otherTeam = match.team1 === teamName ? match.team2 : match.team1;
  const otherTeamRoute = `/ipl/team/${otherTeam}`;

  return (
    <div className="card match-small-card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title text-center">
          <Link to={otherTeamRoute} className="text-decoration-none text-primary">
            vs {otherTeam}
          </Link>
        </h5>
        <p className="text-secondary mb-1">
          <strong>{match.matchWinner} won by {match.result_margin} {match.result}</strong>
        </p>
      </div>
    </div>
  );
};
