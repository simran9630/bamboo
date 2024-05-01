import { expect } from 'chai'; // Assuming you're using Chai for assertions
import pkg from './calc.js';// Assuming your function is in a separate module
import sinon from 'sinon';


// Import or define your function
const { processWeatherData } = pkg;

describe('processWeatherData', () => {
  it('should return true if temperature is greater than 30°C', async () => {
    // Mock the fetchWeatherData function to return weather data with temperature greater than 30°C
    const mockWeatherData = {
      main: {
        temp: 304, // Temperature greater than 30°C in Kelvin
      },
    };
  
    // Call the function
    const result = await processWeatherData(0, 0, 'your-api-key');

    // Check if the result is true
    expect(result).to.be.true;

    // Restore the stub
    sinon.restore();
  });

});
