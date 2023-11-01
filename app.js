const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
hbs.registerPartials('views/partials');
const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.get(`/beers`, (req, res) => {
  punkAPI
    .getBeers()
    .then(response => {
      res.render(`beers.hbs`, { listBeers: response });
    })
    .catch(err => {
      console.log(err);
    });
});
app.get(`/random-beer`, (req, res) => {
  punkAPI
    .getRandom()
    .then(response => {
      res.render(`random-beer.hbs`, response[0]);
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(3000, () => console.log('🏃‍ on port 3000'));
