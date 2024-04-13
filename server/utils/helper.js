function haversine(lat1, lon1, lat2, lon2) {
    const earthRadius = 6371; // Radius of the Earth in kilometers
    const toRadians = (degrees) => (degrees * Math.PI) / 180;
  
    // Convert latitude and longitude from degrees to radians
    lat1 = toRadians(lat1);
    lon1 = toRadians(lon1);
    lat2 = toRadians(lat2);
    lon2 = toRadians(lon2);
  
    // Haversine formula
    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
  
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    // Calculate the distance
    const distance = earthRadius * c;
  
    return distance;
  }




// async function getCoordinates(cityName) {
//     try {
//       const format = 'json';
//       const limit = 1;
  
//       const apiUrl = `https://nominatim.openstreetmap.org/search?format=${format}&q=${encodeURIComponent(cityName)}&limit=${limit}`;
  
//       const response = await axios.get(apiUrl);
  
//       const results = response.data;
//       if (results.length > 0) {
//         const { lat, lon } = results[0];
//         return {lat,lon};
//       } else {
//         console.log('City not found.');
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//     }
//   }


//   async function getNearbyCityNames(latitude, longitude) {
//     try {
//       const apiKey = 'dbea8bf7ceef46f9b6e3d8394f328618'; 
  
//       const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=dbea8bf7ceef46f9b6e3d8394f328618`;
  
//       const response = await axios.get(apiUrl);
  
//       if (response.status === 200) {
//         const results = response.data.results;
//         console.log(results);
//         const nearbyCities = results.map((result) => result.components.city);
//         return nearbyCities;
//       } else {
//         console.error('Unexpected status code:', response.status);
//         return [];
//       }
//     } catch (error) {
//       console.error('Error:', error.message);
//       return [];
//     }
//   }



  export {haversine};