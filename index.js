const axios = require('axios');
require('dotenv').config()
// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(lat, lon, apiKey) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
}

// Function to call another API if temperature is greater than 30
async function processWeatherData(lat, lon, apiKey) {
    try {
        const weatherData = await fetchWeatherData(lat, lon, apiKey);
        console.log(weatherData)
        const temperature = weatherData.main.temp; // Temperature in Kelvin
        if (temperature > 303.15) { // Convert Kelvin to Celsius
            // Call another API here
            console.log('Temperature is greater than 30°C. Calling another API...');
            // Call your other API here
        } else {
            console.log('Temperature is not greater than 30°C.');
        }
    } catch (error) {
        console.error('Error processing weather data:', error);
    }
}

async function runbamboo() {
    axios.post(`http://localhost:8085/rest/api/latest/queue/deployment?versionId={8159233}&environmentId={8355841}`,{}, {
        headers: {
            
            'Authorization':`Bearer ${process.env.AUTH_TOKEN}`
        }
    })
    .then(response => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        console.log(response.data); 
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


// Example usage
const latitude = 37.7749; // Example latitude
const longitude = -122.4194; // Example longitude
const apiKey = process.env.API_KEY;
console.log(apiKey);
runbamboo();
// const express = require('express');

// const app = express();
// const PORT = 3000; // Define the port number


// app.listen(PORT, () => {
//     // processWeatherData(latitude, longitude, apiKey);
//     runbamboo();
//     console.log(`Server is running on http://localhost:${PORT}`);
//     console.log(apiKey);
// });
