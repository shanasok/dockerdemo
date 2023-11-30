import React from 'react';

const WeatherIcon = ({iconId, altText}) => {

  return (
     <img src={`https://openweathermap.org/img/wn/${iconId}@2x.png`} alt={altText} />
  );
};

export default WeatherIcon;
