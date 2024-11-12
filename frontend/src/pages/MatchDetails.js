import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export const MatchDetails = () => {
  const { matchId } = useParams();
  const [matchDetail, setMatchDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  
  useEffect(() => {
    const cachedMatchDetail = sessionStorage.getItem(`matchDetail_${matchId}`);
    if (cachedMatchDetail) {
      setMatchDetail(JSON.parse(cachedMatchDetail));
    } else {
      setLoading(true);
      fetch(`https://api.cricapi.com/v1/match_info?apikey=08de33d1-1723-4743-8de9-441c66829e88&id=${matchId}`)
        .then((res) => res.json())
        .then((data) => {
          setMatchDetail(data.data || {});
          sessionStorage.setItem(`matchDetail_${matchId}`, JSON.stringify(data.data || {})); 
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [matchId]);

  return (
    <div className="container my-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        &larr; Back
      </button>
      {loading ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="text-center text-danger">
          <p>Error: {error}</p>
        </div>
      ) : matchDetail ? (
        <div>
          <h2 className="text-center mb-4">{matchDetail.name}</h2>
          <p>
            <strong>Match Type:</strong> {matchDetail.matchType.toUpperCase()} <br />
            <strong>Status:</strong> {matchDetail.status} <br />
            <strong>Venue:</strong> {matchDetail.venue} <br />
            <strong>Date:</strong> {matchDetail.date} <br />
            <strong>Date & Time (GMT):</strong> {matchDetail.dateTimeGMT}
          </p>
          <h3>Teams</h3>
          <div className="d-flex justify-content-center mb-4">
            {matchDetail.teamInfo && matchDetail.teamInfo.map((team, idx) => (
              <div key={idx} className="text-center mx-3">
                <img src={team.img} alt={team.name} className="team-logo mb-2" />
                <p>{team.name} ({team.shortname})</p>
              </div>
            ))}
          </div>
          {matchDetail.score && matchDetail.score.length > 0 && (
            <div>
              <h3>Score</h3>
              {matchDetail.score.map((score, idx) => (
                <div key={idx} className="mb-3">
                  <p><strong>{score.inning}:</strong></p>
                  <p>Runs: {score.r} | Wickets: {score.w} | Overs: {score.o}</p>
                </div>
              ))}
            </div>
          )}
          <p>
            <strong>Toss Winner:</strong> {matchDetail.tossWinner} <br />
            <strong>Toss Choice:</strong> {matchDetail.tossChoice}
          </p>
          {/* Add more detailed information as needed */}
        </div>
      ) : (
        <p>No match details available.</p>
      )}
    </div>
  );
};
