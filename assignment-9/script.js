// async function getWeather() {

//     const city = document.getElementById("cityInput").value;

//     const url = ` https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&count=1&language=en&format=json`;
    

//     const response = await fetch(url);

//     const data = await response.json();

//     document.getElementById("weatherResult").innerHTML = `
//         <h2>${data.city}</h2>
//         <p>Temperature: ${data.temperature}°C</p>
//         <p>Condition: ${data.condition}</p>
//         <p>Humidity: ${data.humidity}%</p>
//         <p>Wind Speed: ${data.windSpeed} km/h</p>
//     `;
// }




async function getWeather() {

    // Get city entered by the user
    const city = document.getElementById("cityInput").value;

      // Clear input box
    document.getElementById("cityInput").value = "";


    try {

        
        // STEP 1: Get latitude and longitude for the city
        

        const geoUrl =
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;

        const geoResponse = await fetch(geoUrl);

        const geoData = await geoResponse.json();

        // Check whether city was found
        if (!geoData.results) {
            throw new Error("City not found");
        }

        const latitude = geoData.results[0].latitude;
        const longitude = geoData.results[0].longitude;
        const cityName = geoData.results[0].name;


        
        // STEP 2: Get weather using latitude and longitude
        

        const weatherUrl =
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`;

        const weatherResponse = await fetch(weatherUrl);

        const weatherData = await weatherResponse.json();


    
        // STEP 3: Display the data
        

        document.getElementById("weatherResult").innerHTML = `
            <h2>${cityName}</h2>

            <p>
                Temperature:
                ${weatherData.current.temperature_2m}°C
            </p>

            <p>
                Humidity:
                ${weatherData.current.relative_humidity_2m}%
            </p>

            <p>
                Wind Speed:
                ${weatherData.current.wind_speed_10m} km/h
            </p>
        `;

    } catch (error) {

        document.getElementById("weatherResult").innerHTML = `
            <p>Unable to fetch weather data.</p>
        `;

        console.error(error);
    }
}

