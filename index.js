const axios = require('axios');

require('dotenv').config()
// Function to fetch weather data from OpenWeatherMap API


const fs = require('fs');




// Replace content of the file
async function scanStatus() {
    try {
        await resetScan();
        fs.readFile('var.txt', 'utf8', async function (err, data) {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            
            console.log('Current file contents:', data);

            // Perform operations that depend on the file contents here
            // For example, you can parse the data if it contains structured information

            // Perform reset scan operation
           

            // Process weather data
            const stat = await processWeatherData();
            console.log("optacloud scan updated as--------" , stat);

            // Write the updated status to the file
            fs.writeFile('var.txt', `opscan=${stat ? 'true' : 'false'}`, function (err) {
                if (err) throw err;
                console.log('File updated!');
                // Call your function here
                createRelease();
                
                // Read the updated contents of the file
                fs.readFile('var.txt', 'utf8', function (err, newData) {
                    if (err) {
                        console.error('Error reading file after write:', err);
                        return;
                    }
                    console.log('Updated file contents:', newData);
                });
            });
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
        name:"release-20",
        nextVersionName:"release-21",
        planResultKey:"DEM-TES1-121"
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
        console.error('Error:', error);
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
        const weatherData = await axios.post(`http://localhost:8080/sql/releaseSpecific`,{
            token:'Lh7Ndebbs9YuVzHb',
            repo:'demoRepo5',
            branch:'main',
            projectName:'Demo1',
            versionToRelease:'V.'+'1.0.0'
        });
        console.log(weatherData)
        const temperature = weatherData?.data?.status; // Temperature in Kelvin
        return temperature;
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
