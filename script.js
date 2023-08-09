const cityInput = document.querySelector('#cityinput');
const searchBtn = document.querySelector('#searchbtn');
const locationElement = document.querySelector('.location');
const temperatureElement = document.querySelector('.temperature');
const iconElement = document.querySelector('.icon');
const descriptionElement = document.querySelector('.description');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');
const apiKey = '4633f19d0632bb6605b17de09fbb312b'

searchBtn.addEventListener('click',()=>{
    if(cityInput.value === ''){
        window.alert('Please enter a city name');
        locationElement.textContent = '';
        temperatureElement.textContent = '';
        iconElement.innerHTML = '';
        descriptionElement.textContent = '';
        humidityElement.textContent = '';
        windElement.textContent = '';
        return;
    }
    getWeather();
});
 function getWeather(){
    const city = cityInput.value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        temperature = data.main.temp;
        cityName = data.name;
        iconCode = data.weather[0].icon;
        description = data.weather[0].description;
        humidity = data.main.humidity;
        windSpeed = data.wind.speed;

        locationElement.innerHTML = `<i class="fa-solid fa-location-dot"></i>${cityName}`;
        temperatureElement.textContent = `${temperature}°C`;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
        iconElement.innerHTML = `<img src='${iconUrl}' alt ='Weather icon'>`;

        descriptionElement.textContent = description;
        humidityElement.textContent = `Humidity : ${humidity}%`;
        windElement.textContent = `WindSpeed : ${windSpeed}Km/hr`;
    })

    .catch(error => {
        console.error('Error fetching weather data:', error);
        locationElement.textContent = 'City not found';
        temperatureElement.textContent = '';
        iconElement.innerHTML = '';
        descriptionElement.textContent = '';
        humidityElement.textContent = '';
        windElement.textContent = '';
    });
    cityInput.value = '';
};
cityInput.addEventListener('keyup',(e)=>{
    if(cityInput.value === ''){
        window.alert('Please enter a city name');
        locationElement.textContent = '';
        temperatureElement.textContent = '';
        iconElement.innerHTML = '';
        descriptionElement.textContent = '';
        humidityElement.textContent = '';
        windElement.textContent = '';
        return;
    }
    if(e.key == 'Enter'){
        getWeather();
        cityInput.value = '';
    }
})
