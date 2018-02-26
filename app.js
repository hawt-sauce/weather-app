"use strict";

// 4dcd0ff899adadc330c429f32e87d2e7 ----> api key darksky

// https://api.darksky.net/forecast/[key]/[latitude],[longitude]

const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

// console.log(argv)

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    //     console.log(results);
    console.log(errorMessage);
  } else {
    //     console.log(errorMessage);
    console.log(results.address);
    //     console.log(JSON.stringify(results, undefined, 2));
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResult) => {
      if (errorMessage) {
        console.log(errorMessage);
      } else {
        console.log(`The temperature is ${weatherResult.temperature} and it feels like ${weatherResult.apparentTemperature}`);
      }
    });
  }
});