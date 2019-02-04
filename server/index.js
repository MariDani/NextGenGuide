require('dotenv').config()

var express = require("express");
var xAdmin = require('express-admin');
const db = require('./db')

var config = {
  dpath: './express-admin-config/',
  config: require('./express-admin-config/config.json'),
  settings: require('./express-admin-config/settings.json'),
  custom: require('./express-admin-config/custom.json'),
  users: require('./express-admin-config/users.json')
};

xAdmin.init(config, function (err, admin) {
  var app = express();

  if (err) return console.log(err);
  app.use('/admin', admin);

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:2015");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
});


