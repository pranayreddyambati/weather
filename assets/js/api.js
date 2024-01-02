/**
 * @license MIT
 * @fileoverview All api related stuff like api_key, api request etc.
 * @copyright codewithsadee 2023 All rights reserved
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */

'use strict';

const api_key = "ce263e2e0355af081c1cb8bd3e194a31"

// export const fetchData = function (URL, callback) {
//     fetch(`${URL}&appid=${api_key}`)
//     .then(res => res.json())
//     .then(data => callback(data));
// }

export const fetchData = function (URL, callback) {
    fetch(`${URL}&appid=${api_key}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`API request failed with status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => callback(data))
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle the error (e.g., show a user-friendly message)
      });
  }

export const url = {
    currentWeather(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
    },
    forecast(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric`
    },
    airPollution(lat, lon) {
        return `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}`
    },
    reverseGeo(lat, lon) {
        return `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5`
    },
    geo(query) {
        return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`
    }
}