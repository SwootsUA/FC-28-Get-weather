'use strict';

function getWeather() {
    const tempElement = document.querySelector('#temp');
    const windSpeedElement = document.querySelector('#wind-speed');
    const humidityElement = document.querySelector('#humidity');

    const cityNameElement = document.querySelector('#city-name');
    const cityIdElement = document.querySelector('#city-id');

    const chooseNamelement = document.querySelector('#radio-choose-name');

    function resetFields() {
        tempElement.innerText = '-';
        windSpeedElement.innerText = '-';
        humidityElement.innerText = '-';
    }

    function fillFields(data) {
        tempElement.innerText = `${(data.temp - 273.15).toFixed(2)} °C`;
        windSpeedElement.innerText = `${data.wind.toFixed(2)} m/s`;
        humidityElement.innerText = data.humidity.toFixed(2);
    }

    if (chooseNamelement.checked) {
        getWeatherByName(cityNameElement.value, config.WEATHER_API_KEY)
            .then(fillFields)
            .catch(resetFields);
    } else {
        getWeatherById(cityIdElement.value, config.WEATHER_API_KEY)
            .then(fillFields)
            .catch(resetFields);
    }
}

const weatherButton = document.querySelector('#weather-button');

weatherButton.addEventListener('click', getWeather);

function getWeatherByName(name, apiKey) {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`
    ).then(result =>
        result
            .json()
            .then(jsonData => ({
                temp: jsonData.main.temp,
                wind: jsonData.wind.speed,
                humidity: jsonData.main.humidity,
            }))
            .catch(error => ({errorMessage: error}))
    );
}

function getWeatherById(id, apiKey) {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${apiKey}`
    ).then(result =>
        result
            .json()
            .then(jsonData => ({
                temp: jsonData.main.temp,
                wind: jsonData.wind.speed,
                humidity: jsonData.main.humidity,
            }))
            .catch(error => ({errorMessage: error}))
    );
}
