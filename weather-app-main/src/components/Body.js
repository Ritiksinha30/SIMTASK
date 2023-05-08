import React, { useEffect, useState } from 'react';
import './Body.css';
import axios from 'axios';

export default function Body() {
  const apiKey = '2dc09862323115e974d97f2f52693475';

  const [inputCity, setInputCity] = useState('');
  const [data, setData] = useState({});

  const getWeatherDetail = (cityName) => {
    if (!cityName) return;
    // assigining url of openweather api and api key
    const apiUrl =
      'https://api.openweathermap.org/data/2.5/weather?q=' +
      cityName +
      '&appid=' +
      apiKey;

    // applying try catch to get api call
    axios
      .get(apiUrl)
      .then((res) => {
        console.log('response', res.data);
        setData(res.data);
      })
      .catch((err) => {
        // console.log('error', err);
      });
  };

  const inputChangeHandler = (event) => {
    setInputCity(event.target.value);
  };

  // declaring search handler function
  const searchHandler = (event) => {
    getWeatherDetail(inputCity);
    setInputCity("");
  };

  // calling get weather function from here
  useEffect(() => {
    getWeatherDetail('satna');
  }, []);

  return (
    <div className="image">
      <h1 style={{ fontStyle: 'italic' }}>Weather-app</h1>

      <br />

      <div className="row">
        <div className="input-field col s12">
          <input
          value={inputCity}
            id="first_name2"
            type="text"
            className="validate"
            onChange={inputChangeHandler}
          />
          <label className="active" htmlFor="first_name2">
            <big style={{ fontSize: '21.5px', color: 'black' }}>ENTER CITY</big>
          </label>
        </div>
      </div>

      <button type="submit" onClick={searchHandler}>
        SEARCH
      </button>

     <div className="container">
        <h5 className="weather-city">{data?.name}</h5>
        <h5 className="weather">{(data?.main?.temp - 273.15).toFixed(2)}°C</h5>
      </div>
    </div>
  );
}
