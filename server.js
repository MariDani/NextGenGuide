const express = require('express');
const serveStatic = require("serve-static")
const path = require('path');
app = express();
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://next-gen-web.herokuapp.com/");
    // res.header("Access-Control-Allow-Origin", "http://localhost:2015");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
  });
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 80;
app.listen(port);
