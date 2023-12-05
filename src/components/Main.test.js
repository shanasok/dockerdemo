import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Main from './Main';
import MapComponent from './MapComponent';

describe('Main Component', () => {
  test('map click is called correctly', () => {
    // Mock the properties.json file
    jest.mock('../properties.json', () => ({
      defaultLatitude: 40.7128, // Example latitude value
      defaultLongitude: -74.006, // Example longitude value
    }));

    const onClick = jest.fn();
    const { container } = render(<MapComponent lat={40.7128} long={-74.006} onMapClick={onClick}/>);

    // Access the mapRef element using querySelector or any suitable selector
    const mapRefElement = container.querySelector('.mapbox'); // Replace with the appropriate selector

    // Simulate a click event on the mapRef element
    fireEvent.click(mapRefElement);
    expect(onClick).toHaveBeenCalledTimes(1);

  });

});

