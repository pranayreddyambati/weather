/**
 * @license MIT
 * @fileoverview Menage all routes
 * @copyright codewithsadee 2023 All rights reserved
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */

'use strict';

import { updateWeather, error404 } from "./app.js";
const defaultLocation = "#/weather?lat=51.5073219&lon=-0.1276474"

const currentWeather = function() {
    window.navigator.geolocation.getCurrentPosition(res => {
        const { latitude,longitude } = res.coords;

        updateWeather(`${latitude}`, `${longitude}`);
    },err => {
        window.location.hash = defaultLocation;
    });
}

const searchLocation = query => {
    const [latQuery, lonQuery] = query.split("&");
    const lat = parseFloat(latQuery.replace("lat=", ""));
    const lon = parseFloat(lonQuery.replace("lon=", ""));
    
    updateWeather(lat, lon);
};

const routes = new Map([
    ["/current-location", currentWeather],
    ["/weather", searchLocation]
])

const checkHash = function () {
    const requestURL = window.location.hash.slice(1);

    const [route, query] = requestURL.includes ? requestURL.split("?"):
    [requestURL];

    routes.get(route) ? routes.get(route)(query) : error404(); 
}

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function() {
    if (!this.window.location.hash) {
        this.window.location.hash = "#/current-location";
    } else {
        checkHash();
    }
})