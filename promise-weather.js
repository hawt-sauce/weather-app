"use strict";

const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  }).help()
  .alias('help', 'h')
  .argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
  //   console.log(JSON.stringify(response.data, undefined, 2));
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error("Unable to fetch the location");
  }
//   console.log(response.data);
  let lat = response.data.results[0].geometry.location.lat;
  let lng = response.data.results[0].geometry.location.lng;
  let weatherUrl = `https://api.darksky.net/forecast/4dcd0ff899adadc330c429f32e87d2e7/${lat},${lng}`;
  return axios.get(weatherUrl).then((response) => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`The temperature is ${temperature} and it feels like ${apparentTemperature}`);
  })
}).catch((err) => {
  if (err.code === 'ENOTFOUND') {
    console.log("Unable to connect to Google servers.");
  } else {
    console.log(err.message);
  }

  //   console.log(err);
});