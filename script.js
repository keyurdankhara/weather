const apiKey = 'd7e9757b1e43f388dda7b0257d01e11f'; // Replace with your OpenWeatherMap API key

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const cityName = document.getElementById('cityName');
const country = document.getElementById('country');
const weatherDescription = document.getElementById('weatherDescription');
const currentTemperature = document.getElementById('currentTemperature');
const minMaxTemperature = document.getElementById('minMaxTemperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const errorMessage = document.getElementById('errorMessage');

searchButton.addEventListener('click', fetchWeatherData);

locationInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        fetchWeatherData();
    }
});

function fetchWeatherData() {
    const location = locationInput.value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then((data) => {
            displayWeatherData(data);
        })
        .catch((error) => {
            errorMessage.textContent = error.message;
            clearWeatherData();
        });
}

function displayWeatherData(data) {
    cityName.textContent = data.name;
    country.textContent = data.sys.country;
    weatherDescription.textContent = data.weather[0].description;
    currentTemperature.textContent = `Temperature: ${data.main.temp}°C`;
    minMaxTemperature.textContent = `Min/Max Temperature: ${data.main.temp_min}°C / ${data.main.temp_max}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    errorMessage.textContent = '';
}

function clearWeatherData() {
    cityName.textContent = '';
    country.textContent = '';
    weatherDescription.textContent = '';
    currentTemperature.textContent = '';
    minMaxTemperature.textContent = '';
    humidity.textContent = '';
    windSpeed.textContent = '';
}
