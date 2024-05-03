const axios = require('axios');

require('dotenv').config()
// Function to fetch weather data from OpenWeatherMap API


const fs = require('fs');

// Replace content of the file
async function scanStatus() {
    try {
        await resetScan();
        const stat = await processWeatherData();
        console.log(stat);
        fs.writeFile('var.txt', `opscan=${stat ? 'true' : 'false'}`, function (err) {
            if (err) throw err;
            console.log('File updated!');
            // Call your function here
            createRelease();
        });
    } catch (error) {
        console.error('Error in scanStatus:', error);
    }
}
function resetScan(){
    
            fs.writeFile('var.txt', `opscan='false'`, function (err) {
                if (err) throw err;
                console.log('File updated!');
                // Call your function here
               
            });
       
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

// Function to call another API if temperature is greater than 30

async function createRelease() {
    axios.post(`http://localhost:8085/rest/api/latest/deploy/project/11010049/version`,{
        name:"release-8",
        nextVersionName:"release-9",
        planResultKey:"DEM-TES1-73"
    },{
        headers: {
            
            'Authorization':`Bearer ${process.env.AUTH_TOKEN}`
        }
    })
    .then(response => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        console.log(response.data); 
        const verid=response?.data?.id;
        runbamboo(verid);
    })
    .catch(error => {
        console.error('Error:', error?.response?.data?.errors[0]);
    });
}

async function getVersions() {
    axios.get(`http://localhost:8085/rest/api/latest/deploy/project/11010049/versions`,{
        headers: {
            
            'Authorization':`Bearer ${process.env.AUTH_TOKEN}`
        }
    })
    .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        console.log(response.data); 
        const verid=response?.data?.versions;
        if(verid.length>1){
           runbamboo(verid[1].id);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


async function runbamboo(verid) {
    axios.post(`http://localhost:8085/rest/api/latest/queue/deployment?versionId=${verid}&environmentId=11206658`,{

    }, {
        headers: {
            
            'Authorization':`Bearer ${process.env.AUTH_TOKEN}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        console.log(response.data); 
        resetScan();
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

scanStatus();
// getVersions();
// createRelease();
// const express = require('express');

// const app = express();
// const PORT = 3000; // Define the port number


// app.listen(PORT, () => {
//     // processWeatherData(latitude, longitude, apiKey);
//     runbamboo();
//     console.log(`Server is running on http://localhost:${PORT}`);
//     console.log(apiKey);
// });
