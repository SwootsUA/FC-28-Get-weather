'use strict';

async function weatherClickHandler() {
    const tempElement = document.querySelector('#temp');
    const windSpeedElement = document.querySelector('#wind-speed');
    const humidityElement = document.querySelector('#humidity');

    const cityNameElement = document.querySelector('#city-name');
    const cityIdElement = document.querySelector('#city-id');

    const chooseByNameRadio = document.querySelector('#radio-choose-name');

    const query = isUsingName ? cityNameElement.value : cityIdElement.value;

    const data = await getWeather(query, config.WEATHER_API_KEY, chooseByNameRadio.checked);

    let temperature = '-', windSpeed = '-', humidity = '-';

    if (data && data.cod === 200) {
        temperature = data.main.temp.toFixed(2) + ' °C';
        windSpeed = data.wind.speed.toFixed(2) + ' m/s';
        humidity = Math.round(data.main.humidity) + '%'; 
    }

    tempElement.innerText = temperature;
    windSpeedElement.innerText = windSpeed;
    humidityElement.innerText = humidity;
}

async function getWeather(query, apiKey, isName) {
    const result = await fetch(
        `${weatherApiUrl}?${isName ? 'q' : 'id'}=${query}&units=metric&appid=${apiKey}`
    );

    return await result.json();
}


const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather`;

const weatherButton = document.querySelector('#weather-button');

const nameRadioInput = document.querySelector('#radio-choose-name');
const idRadioInput = document.querySelector('#radio-choose-id');

weatherButton.addEventListener('click', weatherClickHandler);

function toggleInputs() {
    const cityNameElement = document.querySelector('#city-name');
    const cityIdElement = document.querySelector('#city-id');

    cityNameElement.disabled = !nameRadioInput.checked;
    cityIdElement.disabled = !idRadioInput.checked;
}

nameRadioInput.addEventListener('click', toggleInputs);
idRadioInput.addEventListener('click', toggleInputs);