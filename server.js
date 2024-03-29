'use strict';

// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');

// Application Setup
const PORT = process.env.PORT;
const app = express();
app.use(cors());
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

app.get('/', (request,response) => {
  response.send('Home Page!');
});
app.get('/bad', (request,response) => {
  throw new Error('poo');
});
app.get('/about', aboutUsHandler);

function aboutUsHandler(request,response) {
  response.status(200).send('About Us Page');
}

// API Routes

app.get('/location', handleLocation);
app.get('/weather', handleWeather);

//Route Handlers

function handleLocation(request,response) {
  //Note: Once I've fetched data from API, I want to save it in my DB, so i need a db save function.
  //this save function should be a method on the specific location object instance
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${request.query.data}&key=${process.env.GEOCODE_API_KEY}`;
  superagent
    .get(url)
    .then( data=> {
      const geoData = data.body;
      const location = new Location(request.query.data, geoData);
      if (!isLocationInDB(location)) saveLocation(location);
      response.send(location);
      response.send(data);
    })
    .catch( error => {
      console.error(error);
      response.status(500).send('Status: 500. Sorry, there is something not quite right');
    });
}

function handleWeather(request, response) {

  const url = `https://api.darksky.net/forecast/${process.env.WEATHER_API_KEY}/${request.query.data.latitude},${request.query.data.longitude}`;
  superagent.get(url)
    .then( data => {
      const weatherSummaries = data.body.daily.data.map(day => {
        return new Weather(day);
      });
      response.status(200).json(weatherSummaries);
    })
    .catch( ()=> {
      errorHandler('So sorry, something went really wrong', request, response);
    });

}

// CONSTRUCTORS

function Location(city, geoData) {
  this.search_query = city;
  this.formatted_query = geoData.results[0].formatted_address;
  this.latitude = geoData.results[0].geometry.location.lat;
  this.longitude = geoData.results[0].geometry.location.lng;
}

function Weather(day) {
  this.forecast = day.summary;
  this.time = new Date(day.time * 1000).toString().slice(0,15);
}


app.use('*', notFoundHandler);
app.use(errorHandler);

// HELPER FUNCTIONS

function saveLocation(location) {
  let safeValues = [
    location.search_query,
    location.formatted_query,
    location.latitude,
    location.longitude
  ];
  let SQL = 'INSERT INTO locations (search_query, formatted_query, latitude, longitude) VALUES($1, $2, $3, $4)';
  client.query(SQL, safeValues).catch( error => errorHandler(error));
}

function isLocationInDB(location) {
  let SQL = `SELECT FROM locations WHERE latitude=${location.latitude} AND longitude=${location.longitude}`;
  client
    .query(SQL)
    .then(results => {
      return results.rowCount === 0;
    })
    .catch(error => errorHandler(error));
}

function notFoundHandler(request,response) {
  response.status(404).send('huh?');
}

function errorHandler(error,request,response) {
  response.status(500).send(error);
}

// Make sure the server is listening for requests
client.connect()
  .then( ()=> {
    app.listen(PORT, ()=> {
      console.log('server and db are up, listening on port ', PORT);
    });
  });
