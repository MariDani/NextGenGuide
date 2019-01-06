var express = require("express");
var app = express();
const db = require('./db')

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
