// MatchPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MatchPage.css'; 
import { MatchSmallCard } from '../components/MatchSmallCard.js';
import Sidebar from '../components/sidebar'; // Import the Sidebar component

export const MatchPage = () => {
  const [matches, setMatches] = useState([]);
  const { teamName, season } = useParams(); // season will now come from the new URL structure

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`http://localhost:8080/team/${teamName}/matches?season=${season}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };
    fetchMatches();
  }, [teamName, season]);

  return (
    <div className="container mt-5 d-flex flex-row">
      {/* Sidebar */}
      <div className="col-md-3">
        <Sidebar teamName={teamName} /> {/* Pass teamName to Sidebar */}
      </div>

      {/* Main Content */}
      <div className="col-md-9">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="display-5 title-gradient">Indian Premier League</h1>
          <h2 className="text-highlighted">{teamName}</h2>
          <h4 className="text-muted">Season {season}</h4>
        </div>

        {/* Win-Loss Graph Placeholder */}
        {/* <div className="text-center mb-5">
          <h5 className="text-secondary">Win-Loss Graph</h5>
          <div className="graph-placeholder">
            <div
              style={{
                width: '100%',
                height: '200px',
                backgroundColor: '#e0e0e0',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#6c757d' }}>Graph will be displayed here.</span>
            </div>
          </div>
        </div> */}

        {/* Matches Grid using MatchSmallCard */}
        <div className="row">
          {matches.map((match) => (
            <div className="col-md-6 col-lg-4 mb-4" key={match.id}>
              <MatchSmallCard match={match} teamName={teamName} />
            </div>
          ))}
        </div>

        {/* More Matches Button */}
        <div className="text-center mt-4">
          <a href="#" className="btn btn-primary btn-lg more-btn">
            More Matches
          </a>
        </div>
      </div>
    </div>
  );
};
