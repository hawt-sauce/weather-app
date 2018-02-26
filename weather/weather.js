const request = require('request');

let getWeather = (lat,lng,callback) => {
  request({
    url:`https://api.darksky.net/forecast/4dcd0ff899adadc330c429f32e87d2e7/${lat},${lng}`,
    json:true
  }, (error, response, body) => {
    if(!error && response.statusCode==200){
      callback(undefined,{
        temperature:body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }else{
      callback("Unable to fetch weather.");
    }
  } );
};

module.exports.getWeather = getWeather;