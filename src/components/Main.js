import React, { useState, useEffect } from 'react';
import MapComponent from './MapComponent';
import Weather from '../Weather';
import properties from '../properties.json';

const Main = () => {
    const [latitude, setLatitude] = useState(properties.defaultLatitude); // State to store latitude
    const [longitude, setLongitude] = useState(properties.defaultLongitude); // State to store longitude

    //Set some default values if no environment variables are found - bit hacky, but useful for Github pages.
    if (latitude == null)
        setLatitude(40.661930);
    if (longitude == null)
        setLongitude(-74.211647);

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
                   <MapComponent lat={latitude} long={longitude} onMapClick={handleMapClick}/>
               </div>

                <div className="right">
                   <Weather latitude={latitude} longitude={longitude}/>
                </div>
           </div>
};

export default Main;