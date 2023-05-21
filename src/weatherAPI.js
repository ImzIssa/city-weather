const OPEN_WEATHER_MAPS_API_KEY = "d4d04f0c0802e4786ec8f4eb006257e0";

const GEOCODE_API_KEY = "AIzaSyDLgclPxrMsdEu8Rt60eaFS1lDevpatdwU";

const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GEOCODE_API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    if (data.results.length > 0) {
      const addressComponents = data.results[0].address_components;
      const city = addressComponents.find(
        (component) =>
          component.types.includes("locality") ||
          component.types.includes("administrative_area_level_1")
      );
      if (city) {
        return city.long_name;
      }
    }
    throw new Error("City not found.");
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const getWeather = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_MAPS_API_KEY}&units=metricx`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
};

const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
};

export { getCurrentPosition, reverseGeocode, getWeather };
