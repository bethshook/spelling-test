const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const randomWords = require('random-words');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/word', function (req, res) {
  const word = randomWords({exactly: 1, maxLength: 10});
  return res.send(word);
});

app.get('/', function (req, res) {
  // req.query
  // req.params
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(process.env.PORT || 8080);
