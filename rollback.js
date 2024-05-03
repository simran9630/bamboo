const axios = require('axios');

require('dotenv').config()

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

getVersions();