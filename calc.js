const axios=require("axios");
require('dotenv').config()
async function processWeatherData(lat, lon, apiKey) {
    try {
        const weatherData = await fetchWeatherData(lat, lon, apiKey);
        console.log(weatherData)
        const temperature = weatherData.main.temp; // Temperature in Kelvin
        return temperature < 303.15
    } catch (error) {
        console.error('Error processing weather data:', error);
    }
}
async function fetchWeatherData(lat, lon, apiKey) {
    try {
        const api=process.env.API_KEY;
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

module.exports={processWeatherData}
