import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import Weather from '../Weather';

const Main = () => {
    const [latitude, setLatitude] = useState(process.env.REACT_APP_LAT); // State to store latitude
    const [longitude, setLongitude] = useState(process.env.REACT_APP_LON); // State to store longitude

    const handleMapClick = (clickedLat, clickedLng) => {
        // Do something with the clicked coordinates in App component
        console.log(`Clicked Latitude in App: ${clickedLat}, Clicked Longitude in App: ${clickedLng}`);
        // You can set state, call other functions, etc.
        setLatitude(clickedLat);
        setLongitude(clickedLng);
    };

    /*Retrieves data and sets state of 'loading' to trigger a re-render.*/
    useEffect(() => {

    }, []); // Empty dependency array ensures useEffect runs only once (on mount)

    return <div className="main">
               <div className="left">
                   <MapComponent onMapClick={handleMapClick}/>
               </div>

                <div className="right">
                   <Weather latitude={latitude} longitude={longitude}/>
                </div>
           </div>
};

export default Main;