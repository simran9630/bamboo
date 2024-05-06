const axios = require('axios');

require('dotenv').config()

async function cRelease() {
    try{
        throw new Error("error");
    }catch(error){
        console.log(error);
    }
}



async function createRelease() {
    axios.post(`http://localhost:8085/rest/api/latest/deploy/project/11010049/version`,{
        name:"release-13",
        nextVersionName:"release-14",
        planResultKey:"DEM-TES1-105"
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
        if(temperature){
            createRelease();
        }else{
            throw new Error("Failed to release database initiating rollback")
        }
        return temperature;
    } catch (error) {
        console.error('Error processing weather data:', error);
    }
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
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

cRelease();