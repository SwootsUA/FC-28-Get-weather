'use strict';

async function weatherClickHandler() {
    const tempElement = document.querySelector('#temp');
    const windSpeedElement = document.querySelector('#wind-speed');
    const humidityElement = document.querySelector('#humidity');

    const cityNameElement = document.querySelector('#city-name');
    const cityIdElement = document.querySelector('#city-id');

    const chooseByNameRadio = document.querySelector('#radio-choose-name');

    function updateWeatherData(d = null) {
        tempElement.innerText = d ? `${d.temp.toFixed(2)} °C` : '-';
        windSpeedElement.innerText = d ? `${d.wind.toFixed(2)} m/s` : '-';
        humidityElement.innerText = d ? `${Math.round(d.humidity)}%` : '-';
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

const weatherButton = document.querySelector('#weather-button');

weatherButton.addEventListener('click', wetherClickHandler);

const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather`;
