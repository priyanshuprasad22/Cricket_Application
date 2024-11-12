import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import 'bootstrap/dist/css/bootstrap.min.css';

export const CricketDashboard = () => {
  const [view, setView] = useState('matches');
  const [seriesData, setSeriesData] = useState([]);
  const [matchesData, setMatchesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use navigate for redirection

  // Fetch Current Matches
  useEffect(() => {
    if (view === 'matches') {
      const cachedMatches = sessionStorage.getItem('matchesData');
      if(cachedMatches){
        setMatchesData(JSON.parse(cachedMatches));
      }else{
      setLoading(true);
      fetch('https://api.cricapi.com/v1/currentMatches?apikey=08de33d1-1723-4743-8de9-441c66829e88&offset=0')
        .then((res) => res.json())
        .then((data) => {
          setMatchesData(data.data || []);
          sessionStorage.setItem('matchesData', JSON.stringify(data.data || []));
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }
  }, [view]);

  // Fetch Series Data
  useEffect(() => {
    if (view === 'series') {
      const cachedSeries= sessionStorage.getItem('sessionData');
      if(cachedSeries){
        setSeriesData(JSON.parse(cachedSeries));
      }else{
      setLoading(true);
      fetch('https://api.cricapi.com/v1/series?apikey=08de33d1-1723-4743-8de9-441c66829e88&offset=0')
        .then((res) => res.json())
        .then((data) => {
          setSeriesData(data.data || []);
          sessionStorage.setItem('seriesData', JSON.stringify(data.data || []));
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }
  }, [view]);

  // Handle Series Click and Redirect to Series Details Page
  const handleSeriesClick = (seriesId) => {
    navigate(`/matches/series/${seriesId}`); // Redirect to the series detail page with seriesId
  };

  const handleMatchClick = (matchId)=>{
    navigate(`/matches/match_info/${matchId}`);
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Cricket Dashboard</h2>

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-center mb-4">
        <button
          className={`btn btn-primary mx-2 ${view === 'matches' ? 'active' : ''}`}
          onClick={() => setView('matches')}
        >
          View Current Matches
        </button>
        <button
          className={`btn btn-primary mx-2 ${view === 'series' ? 'active' : ''}`}
          onClick={() => setView('series')}
        >
          View Series
        </button>
      </div>

      {/* Content Section */}
      <div className="row">
        {loading ? (
          <div className="col-12 text-center">
            <p>Loading...</p>
          </div>
        ) : error ? (
          <div className="col-12 text-center text-danger">
            <p>Error: {error}</p>
          </div>
        ) : view === 'matches' ? (
          matchesData.length > 0 ? (
            matchesData.map((match, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100" onClick={()=> handleMatchClick(match.id)}>
                  <div className="card-body">
                    <h5 className="card-title">{match.name}</h5>
                    <p className="card-text">
                      Status: {match.status} <br />
                      Venue: {match.venue} <br />
                      Date: {match.date}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No matches available.</p>
          )
        ) : view === 'series' ? (
          seriesData.length > 0 ? (
            seriesData.map((series, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100" onClick={() => handleSeriesClick(series.id)}>
                  <div className="card-body">
                    <h5 className="card-title">{series.name}</h5>
                    <p className="card-text">
                      Start Date: {series.startDate} <br />
                      End Date: {series.endDate} <br />
                      Matches: {series.matches}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No series available.</p>
          )
        ) : null}
      </div>
    </div>
  );
};
