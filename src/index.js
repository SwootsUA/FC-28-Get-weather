'use strict';

async function weatherClickHandler() {
    const tempElement = document.querySelector('#temp');
    const windSpeedElement = document.querySelector('#wind-speed');
    const humidityElement = document.querySelector('#humidity');

    const cityNameElement = document.querySelector('#city-name');
    const cityIdElement = document.querySelector('#city-id');

    const chooseByNameRadio = document.querySelector('#radio-choose-name');

    function updateWeatherData(data = null) {
        tempElement.innerText = data ? `${data.temp.toFixed(2)} °C` : '-';
        windSpeedElement.innerText = data ? `${data.wind.toFixed(2)} m/s` : '-';
        humidityElement.innerText = data ? `${Math.round(data.humidity)}%` : '-';
    }

    try {
        const isUsingName = chooseByNameRadio.checked;
        const query = isUsingName ? cityNameElement.value : cityIdElement.value;

        const {main, wind} = await getWeather(
            query,
            config.WEATHER_API_KEY,
            isUsingName
        );

        const data = {
            temp: main.temp,
            wind: wind.speed,
            humidity: main.humidity,
        };

        updateWeatherData(data);
    } catch (error) {
        updateWeatherData();
    }
}

async function getWeather(query, apiKey, isName) {
    const result = await fetch(
        `${weatherApiUrl}?${isName ? 'q' : 'id'}=${query}&units=metric&appid=${apiKey}`
    );
    try {
        return await result.json();
    } catch (error) {
        throw new Error(error);
    }
}

function toggleInputs(e) {
    const cityNameElement = document.querySelector('#city-name');
    const cityIdElement = document.querySelector('#city-id');

    if (e.target.id === 'radio-choose-name') {
        cityIdElement.disabled = true;
        cityNameElement.disabled = false;
    } else {
        cityIdElement.disabled = false;
        cityNameElement.disabled = true;
    }
}

const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather`;

const weatherButton = document.querySelector('#weather-button');

const nameRadioInput = document.querySelector('#radio-choose-name');
const idRadioInput = document.querySelector('#radio-choose-id');

weatherButton.addEventListener('click', weatherClickHandler);

nameRadioInput.addEventListener('click', toggleInputs);
idRadioInput.addEventListener('click', toggleInputs);
