import React, { useRef, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


const MapComponent = ({ onMapClick }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize the map
    const map = L.map(mapRef.current).setView([40.7128, -74.006], 10); // Set initial coordinates and zoom

    // Add Leaflet tile layer (use a free tile layer provider)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Event handler for map click
    const handleMapClick = (e) => {
        const clickedLat = e.latlng.lat;
        const clickedLng = e.latlng.lng;
        // Call the onMapClick function from props and pass the coordinates
        onMapClick(clickedLat, clickedLng);
    };

    // Add click event listener to the map
    map.on('click', handleMapClick);

    return () => {
      // Clean up if needed
      map.off('click', handleMapClick);
      map.remove();
    };
  });

  return <div ref={mapRef} className="mapbox" />;
};

export default MapComponent;