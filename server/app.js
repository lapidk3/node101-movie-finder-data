const express = require('express'); // Pulling in the express framework
const morgan = require('morgan'); // Pulling in morgan
const axios = require('axios').default; // Pulling in axios
require('dotenv').config(); // Pulling in env file to get API KEY
var bodyParser = require('body-parser'); // Pullingin the body parser

var movies = {}; // Create an object to store the movies in for faster access

// Creates an express instance
const app = express();

// Apply middleware
app.use(morgan('dev'));

/*
app.get('/', function(req, res) {
    res.send("To access a particular movie's info go to '/?t=[MOVIE_TITLE]' or '/?i=[IMDB_ID]'");
});
*/

app.get('/', function(req, res) {
     if(movies[req.url] != null) {
        res.send(movies[req.url]);
    } else if(req.url != '/') {
        axios.get('http://omdbapi.com' + req.url + '&apikey=' + process.env.API_KEY)
            .then(function(response) {
                movies[req.url] = response.data;
                res.send(response.data);
            })
            .catch(function(err) {
                console.log(err);
            });
    } else {
        res.send("To access a particular movie's info go to '/?t=[MOVIE_TITLE]' or '/?i=[IMDB_ID]'");
    }
});



// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

module.exports = app;