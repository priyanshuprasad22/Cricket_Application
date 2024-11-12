import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MatchDetailCard } from "../components/MatchDetailCard";
import { MatchSmallCard } from "../components/MatchSmallCard";
import './TeamPage.css';
import Loader from '../components/Loader'; 
import PieChart from '../components/PieChart'; 
import { TeamSidebar } from '../components/TeamSidebar'; 

function TeamPage() {
  const [team, setTeam] = useState({ matches: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { teamName } = useParams();
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`http://localhost:8080/team/${teamName}`);
        if (!response.ok) {
          throw new Error(`Error fetching team data: ${response.statusText}`);
        }
        const data = await response.json();
        setTeam(data);
        setWins(data.totalWins);
        setLosses(data.totalMatches - data.totalWins);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [teamName]);

  if (loading) {
    return <Loader />; // Use a Loader component for better UX
  }

  if (error) {
    return <h2 className="error-message">Error: {error}</h2>;
  }

  if (!team || !team.teamName) {
    return <h1 className="not-found-message">Team not found.</h1>;
  }

  return (
    <div className="page-container">
      <TeamSidebar /> {/* Sidebar for team names */}
      <div className="content-section">
        <h1 className="league-title">Indian Premier League</h1>
        <div className="team-name-section">
          <h2 className="team-name">{team.teamName}</h2>
        </div>

        <div className="win-loss-section">
          <h3>Wins: {wins} | Losses: {losses}</h3>
        </div>

        {/* Pie Chart for Wins and Losses */}
        <div className="pie-chart-section">
          <PieChart wins={wins} losses={losses} />
        </div>

        <div className="match-detail-section">
          <h2>Latest Match</h2>
          {team.matches.length > 0 ? (
            <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />
          ) : (
            <p>No matches available.</p>
          )}
        </div>

        <div className="small-card-section">
          <h2>Other Matches</h2>
          {team.matches.slice(1).map((match, index) => (
            <MatchSmallCard key={index} teamName={team.teamName} match={match} />
          ))}
        </div>

        <div className="more-link-section">
          <Link to={`/ipl/team/${teamName}/matches/season/2023`} className="more-link">View All Matches</Link>
        </div>
      </div>
    </div>
  );
}

export default TeamPage;
