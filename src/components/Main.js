import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import Weather from '../Weather';
import properties from '../properties.json';

const Main = () => {
    const [latitude, setLatitude] = useState(properties.defaultLatitude); // State to store latitude
    const [longitude, setLongitude] = useState(properties.defaultLongitude); // State to store longitude

    const handleMapClick = (clickedLat, clickedLng) => {
        // Do something with the clicked coordinates in App component
        setLatitude(clickedLat);
        setLongitude(clickedLng);
    };

    /*Retrieves data and sets state of 'loading' to trigger a re-render.*/
    useEffect(() => {

    }, []); // Empty dependency array ensures useEffect runs only once (on mount)

    return <div className="main">
               <div className="left" data-testid="left-panel">
                   <MapComponent lat={latitude} long={longitude} onMapClick={handleMapClick}/>
               </div>

                <div className="right">
                   <Weather latitude={latitude} longitude={longitude}/>
                </div>
           </div>
};

export default Main;