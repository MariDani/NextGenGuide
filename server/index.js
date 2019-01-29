require('dotenv').config()

var express = require("express");
var app = express();
const db = require('./db')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:2015");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.get('/mentors', (req, res, next) => {
  db.query('SELECT * FROM mentors', (err, dbRes) => {
    if (err) {
      return next(err)
    }
    res.json(dbRes.rows)
  })
});

app.get('/mentees', (req, res, next) => {
  db.query('SELECT * FROM mentees', (err, dbRes) => {
    if (err) {
      return next(err)
    }
    res.json(dbRes.rows)
  })
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
