import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({latitude, longitude}) => {
  const [data, setData] = useState(null); // State to store API response
  const [loading, setLoading] = useState(true); // State to track loading state

  /*Returns elements to be rendered, according to the structure of the JSON data retrieved.*/
  const renderData = (obj) => {
    return Object.entries(obj).map(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
        // If the value is an object (non-array and non-null), render its contents recursively
        return (
          <div key={key}>
            <h4>{key}</h4>
            <div style={{ marginLeft: '20px' }}>{renderData(value)}</div>
          </div>
        );
      } else if (Array.isArray(value)) {
        // If the value is an array, render its elements
        return (
          <div key={key}>
            <h4>{key}</h4>
            <ul>
              {renderData(value)}

            </ul>
          </div>
        );
      } else {
        // Otherwise, render key-value pair
        return (
          <div key={key}>
            <strong>{key}:</strong> {value}
          </div>
        );
      }
    });
  };

  /*Retrieves data and sets state of 'loading' to trigger a re-render.*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true before making the API call
        setLoading(true);

        // Make an API call using Axios
        const response = await axios({
                                       'method':'GET',
                                       'url':'https://api.openweathermap.org/data/2.5/weather',
                                       'headers': {
                                           'Content-Type': 'application/json',
                                       },
                                       'params': {
                                           'lat': latitude,
                                           'lon': longitude,
                                           'appid':process.env.REACT_APP_WEATHER_API_KEY,
                                       },
                                   });

        // Set the data received from the API response
        setData(response.data);
      } catch (error) {
        // Handle any errors that occurred during the API call
        console.error('Error fetching data:', error);
      } finally {
        // Set loading to false after the API call completes (whether success or failure)
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [latitude, longitude]); // Include latitude and longitude in the dependency array
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {/* Display your fetched data */}
          {data && (
            <ul>
              <h3>Weather in {data['name']}:</h3>
              <li>Description: {data['weather'][0]['description']}</li>
              {renderData(data)}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;
