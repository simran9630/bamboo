const axios = require('axios');

require('dotenv').config()
// Function to fetch weather data from OpenWeatherMap API
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

// Function to call another API if temperature is greater than 30

async function createRelease() {
    axios.get(`http://localhost:8085/rest/api/latest/deploy/project/{8159233}/versions`,{
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



async function createVar() {
    const val= await processWeatherData();
    axios.post(`http://localhost:8085/rest/api/latest/deploy/environment/8355841/variable`,{
       
        name:"opscan",
        value:val
       
    }, {
        headers: {
            
            'Authorization':`Bearer ${process.env.AUTH_TOKEN}`,
            'Content-Type': 'application/json'
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

async function runbamboo() {
    axios.post(`http://localhost:8085/rest/api/latest/queue/deployment?versionId=8749057&environmentId=8355841`,{

    }, {
        headers: {
            
            'Authorization':`Bearer ${process.env.AUTH_TOKEN}`,
            'Content-Type': 'application/json'
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
// createRelease();
async function processWeatherData(lat, lon, apiKey) {
    try {
        const weatherData = await fetchWeatherData(lat, lon, apiKey);
        console.log(weatherData)
        const temperature = weatherData.main.temp; // Temperature in Kelvin
        return temperature > 303.15
    } catch (error) {
        console.error('Error processing weather data:', error);
    }
}

createVar();
// const express = require('express');

// const app = express();
// const PORT = 3000; // Define the port number


// app.listen(PORT, () => {
//     // processWeatherData(latitude, longitude, apiKey);
//     runbamboo();
//     console.log(`Server is running on http://localhost:${PORT}`);
//     console.log(apiKey);
// });
