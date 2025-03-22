'use strict';

async function getWeather() {
    const tempElement = document.querySelector('#temp');
    const windSpeedElement = document.querySelector('#wind-speed');
    const humidityElement = document.querySelector('#humidity');

    const cityNameElement = document.querySelector('#city-name');
    const cityIdElement = document.querySelector('#city-id');

    const chooseNameElement = document.querySelector('#radio-choose-name');

    function resetFields() {
        tempElement.innerText = '-';
        windSpeedElement.innerText = '-';
        humidityElement.innerText = '-';
    }

    function fillFields(data) {
        tempElement.innerText = `${(data.temp - 273.15).toFixed(2)} °C`;
        windSpeedElement.innerText = `${data.wind.toFixed(2)} m/s`;
        humidityElement.innerText = `${Math.round(data.humidity)}%`;
    }

    try {
        let data;
        if (chooseNameElement.checked) {
            data = await getWeatherByName(
                cityNameElement.value,
                config.WEATHER_API_KEY
            );
        } else {
            data = await getWeatherById(
                cityIdElement.value,
                config.WEATHER_API_KEY
            );
        }
        fillFields(data);
    } catch (error) {
        resetFields();
    }
}

const weatherButton = document.querySelector('#weather-button');

weatherButton.addEventListener('click', getWeather);

async function getWeatherByName(name, apiKey) {
    const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`
    );
    try {
        const jsonData = await result.json();
        return {
            temp: jsonData.main.temp,
            wind: jsonData.wind.speed,
            humidity: jsonData.main.humidity,
        };
    } catch (error) {
        throw new Error(error);
    }
}

async function getWeatherById(id, apiKey) {
    const result = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${apiKey}`
    );
    try {
        const jsonData = await result.json();
        return {
            temp: jsonData.main.temp,
            wind: jsonData.wind.speed,
            humidity: jsonData.main.humidity,
        };
    } catch (error) {
        throw new Error(error);
    }
}
