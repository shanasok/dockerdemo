import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherIcon from './components/WeatherIcon';

const Weather = ({latitude, longitude}) => {
  const [data, setData] = useState(null); // State to store API response
  const [loading, setLoading] = useState(true); // State to track loading state

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
                                           'units':'imperial',
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
            <div>
              <h3>Weather in {data['name']}:</h3>
              <p>Description: {data['weather'][0]['description']}</p>
              <WeatherIcon iconId={data['weather'][0]['icon']} altText={data['weather'][0]['main']}/>

              <p>Temp: {data['main'].temp}</p>
              <p>Feels Like: {data['main'].feels_like}</p>
              <p>Min Temp: {data['main'].temp_min}</p>
              <p>Max Temp: {data['main'].temp_max}</p>
              <p>Pressure : {data['main'].pressure}</p>
              <p>Humidity : {data['main'].humidity}</p>
              <p>Wind Speed : {data['wind'].speed}</p>

            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;
