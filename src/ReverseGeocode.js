import axios from 'axios';

/*Reverse Geocoding to get the address from the latitude and longitude.*/
const getAddressFromLatLong = async ({latitude, longitude}) => {

    try {
        const params = {
            lat: latitude,
            lon: longitude,
            format: 'json',
        }

        // Make an API call using Axios
        const response = await axios({
                                       'method':'GET',
                                       'url':'https://nominatim.openstreetmap.org/reverse',
                                       'headers': {
                                          'Content-Type': 'application/json',
                                       },
                                       'params': params,
                                     });
        return response.data.address;
    }catch (error) {
        // Handle any errors that occurred during the API call
        console.error('Error fetching data:', error);
    }
}

export default getAddressFromLatLong;