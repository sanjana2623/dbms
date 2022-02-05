const express = require('express')
const app = express()
const cors = require("cors")
const port = 3001
const pool = require("./db")

app.use(cors());

const match_model = require('./matches')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  match_model.getMatches()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})




app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})