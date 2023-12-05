// Main.js

import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import Weather from '../Weather';
import properties from '../properties.json';

export const handleMapClick = (setLatitude, setLongitude) => (clickedLat, clickedLng) => {
  // Do something with the clicked coordinates in App component
  setLatitude(clickedLat);
  setLongitude(clickedLng);
};

const Main = () => {
  const [latitude, setLatitude] = useState(properties.defaultLatitude);
  const [longitude, setLongitude] = useState(properties.defaultLongitude);

  useEffect(() => {
    // Add any logic here if needed
  }, []);

  return (
    <div className="main">
      <div className="left" data-testid="left-panel">
        <MapComponent lat={latitude} long={longitude} onMapClick={handleMapClick(setLatitude, setLongitude)} />
      </div>

      <div className="right">
        <Weather latitude={latitude} longitude={longitude} />
      </div>
    </div>
  );
};

export default Main;
