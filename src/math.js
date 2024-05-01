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

module.exports = { processWeatherData };
