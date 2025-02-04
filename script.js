const apiKey = 'b2b53e2816e94a4f971160703250302'; // Replace with your API key
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');

// Fetch weather data
async function fetchWeather(city) {
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
    }
}

// Update UI with weather data
function updateWeatherUI(data) {
    // Update location
    document.querySelector('.location h2').textContent = data.location.name;
    document.querySelector('.location p').textContent = data.location.country;

    // Update time
    const [date, time] = data.location.localtime.split(' ');
    document.querySelector('.time p:first-child').textContent = time;
    document.querySelector('.time p:last-child').textContent = date;

    // Update main weather
    document.querySelector('.temperature').textContent = data.current.temp_c;
    document.querySelector('.weather-condition p').textContent = data.current.condition.text;
    document.querySelector('.weather-condition img').src = `https:${data.current.condition.icon}`;

    // Update details
    document.querySelector('.detail-card:nth-child(1) p').textContent = `${data.current.humidity}%`;
    document.querySelector('.detail-card:nth-child(2) p').textContent = `${data.current.wind_kph} km/h`;
    document.querySelector('.detail-card:nth-child(3) p').textContent = `${data.current.feelslike_c}°C`;

    // Update AQI
    const aqiLevels = ['good', 'moderate', 'unhealthy', 'very-unhealthy', 'hazardous'];
    const aqiElement = document.querySelector('.aqi-badge');
    aqiElement.className = `aqi-badge ${aqiLevels[data.current.air_quality['us-epa-index'] - 1]}`;
    aqiElement.textContent = aqiLevels[data.current.air_quality['us-epa-index'] - 1].toUpperCase();
}

// Event listener for search button
searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

// Event listener for Enter key
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        } else {
            alert('Please enter a city name.');
        }
    }
});

// Initialize with default city
fetchWeather('London');