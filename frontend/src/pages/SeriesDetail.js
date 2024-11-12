import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the seriesId from URL
import 'bootstrap/dist/css/bootstrap.min.css';

export const SeriesDetails = () => {
  const { seriesId } = useParams(); 
  const [seriesDetails, setSeriesDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(seriesId);
  
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.cricapi.com/v1/series_info?apikey=08de33d1-1723-4743-8de9-441c66829e88&id=${seriesId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSeriesDetails(data.data || null);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [seriesId]);

  return (
    <div className="container my-5">
      {loading ? (
        <div className="text-center">
          <p>Loading...</p>
        </div>
      ) : error ? (
        <div className="text-center text-danger">
          <p>Error: {error}</p>
        </div>
      ) : seriesDetails ? (
        <div>
          <h2 className="text-center mb-4">{seriesDetails.info.name}</h2>
          <p>
            <strong>Start Date:</strong> {seriesDetails.info.startdate} <br />
            <strong>End Date:</strong> {seriesDetails.info.enddate} <br />
            <strong>ODIs:</strong> {seriesDetails.info.odi} <br />
            <strong>T20s:</strong> {seriesDetails.info.t20} <br />
            <strong>Tests:</strong> {seriesDetails.info.test} <br />
            <strong>Squads:</strong> {seriesDetails.info.squads} <br />
            <strong>Total Matches:</strong> {seriesDetails.info.matches}
          </p>
          <h3>Matches</h3>
          <div className="row">
            {seriesDetails.matchList.length > 0 ? (
              seriesDetails.matchList.map((match, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <div className="card h-100">
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
              <p>No matches available for this series.</p>
            )}
          </div>
        </div>
      ) : (
        <p>No series details available.</p>
      )}
    </div>
  );
};
