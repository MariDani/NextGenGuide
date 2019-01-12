require('dotenv').config()

var express = require("express");
var app = express();
const db = require('./db')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:2015");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
  next();
});

app.get('/absolvents', (req, res, next) => {
  db.query('SELECT * FROM absolvents', (err, dbRes) => {
    if (err) {
      return next(err)
    }
    res.json(dbRes.rows[0])
  })
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
