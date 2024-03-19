const apiKey = 'bbbd9813f1ddcbaff0045a17f5e3866d'; // Replace with your API key

// Function to get weather data based on user's location
function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert('Geolocation is not supported by this browser.');
  }

  function success(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
  }

  function error() {
    alert('Unable to retrieve your location');
  }
}

// Function to get weather data based on manual location input
function getWeatherByInput() {
  const manualLocation = document.getElementById('manual-location');
  const locationText = manualLocation.value.trim();

  if (locationText) {
    getWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${locationText}&appid=${apiKey}&units=metric`);
  } else {
    alert('Please enter a valid location.');
  }
}

// Function to fetch and display weather data
function getWeatherData(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayLocation(data.name);
      displayWeatherData(data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
      alert('Unable to fetch weather data. Please try again.');
    });
}

// Function to display the user's location
function displayLocation(location) {
  document.getElementById('location').innerText = `Location: ${location}`;
}

// Function to display weather data
function displayWeatherData(data) {
  const weatherData = document.getElementById('weather-data');
  weatherData.innerHTML = `
    <h2>Weather Conditions</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Feels Like: ${data.main.feels_like}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
    <p>Weather: ${data.weather[0].description}</p>
  `;
}

// Event listeners
document.getElementById('current-location-btn').addEventListener('click', getWeatherByLocation);
document.getElementById('get-weather-btn').addEventListener('click', getWeatherByInput);