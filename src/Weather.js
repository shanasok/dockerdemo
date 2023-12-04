import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getDescriptionAndImageUrl from './WeatherCodes';
import getAddressFromLatLong from './ReverseGeocode';

const Weather = ({latitude, longitude}) => {
  const [data, setData] = useState(null); // State to store API response
  const [codeDescription, setCodeDescription] = useState(null);
  const [iconUrl, setIconUrl] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading state

  /*Retrieves data and sets state of 'loading' to trigger a re-render.*/
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true before making the API call
        setLoading(true);
        const params = {
          latitude: latitude,
          longitude: longitude,
          current: [
            'temperature_2m',
            'relative_humidity_2m',
            'apparent_temperature',
            'is_day',
            'precipitation',
            'rain',
            'showers',
            'snowfall',
            'weather_code',
            'wind_speed_10m',
            'wind_direction_10m',
            'wind_gusts_10m',
            'weather_code',
          ].join(','), // Convert 'current' array to comma-separated string
          hourly: 'temperature_2m',
          daily: ['sunrise', 'sunset'].join(','), // Convert 'daily' array to comma-separated string
          temperature_unit: 'fahrenheit',
          wind_speed_unit: 'mph',
          forecast_days: 1,
          timezone: 'America/New_York',
        };

        // Make an API call using Axios
        const meteoResponse = await axios({
                                       'method':'GET',
                                       'url':'https://api.open-meteo.com/v1/forecast',
                                       'headers': {
                                           'Content-Type': 'application/json',
                                       },
                                       'params': params,
                                   });

        const descriptionAndImageUrl = await getDescriptionAndImageUrl({
          weatherCode: meteoResponse.data['current'].weather_code,
          isDay: meteoResponse.data['current'].is_day
        });

        setCodeDescription(descriptionAndImageUrl[0]); // Get the description at index 0
        setIconUrl(descriptionAndImageUrl[1]); // Get the icon URL at index 1

        //Update the address field only if it's different to what we had already, to prevent react from doing unnecessary updates
        //Also this is a bit hacky - I've added more values to meteoResponse, rather than making a new variable, to prevent
        //react from rerendering the page unnecessarily. I'm sure there is a better way to do this, but I'm not sure about it for now.
        const fetchedAddress = await getAddressFromLatLong({latitude, longitude});
        if (meteoResponse.data['address'] == null || meteoResponse.data['address'].city !== fetchedAddress.city || meteoResponse.data['address'].town !== fetchedAddress.town){
            meteoResponse.data['address'] = fetchedAddress;
        }

        // Set the data received from the API response
        setData(meteoResponse.data);
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
              <p>Latitude: {data['latitude']}</p>
              <p>Longitude: {data['longitude']}</p>
              <p>{data['address'].town} {data['address'].city}, {data['address'].country}</p>
              <p>Temp: {data['current'].temperature_2m} F</p>
              <p>Description: {codeDescription}</p>
              <p><img src={iconUrl} alt={codeDescription} /></p>
              <p>Humidity: {data['current'].relative_humidity_2m}</p>
              <p>Wind Speed: {data['current'].wind_speed_10m} mph</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;
