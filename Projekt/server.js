const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const ejsLint = require('ejs-lint');
const app = express()

const apiKey = '1476febbdd11046cda4c42d1a7c52d18';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, var god och försök igen'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, var god och försök igen'});
      } else {
        let weatherText = `Det är ${weather.main.temp} °C grader i ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Connected port 3000!')
})