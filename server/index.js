const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const axios = require('axios');

require('dotenv').config({ path: '../.env' });
const randomWords = require('random-words');

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/word', function (req, res) {
  const wordArr = randomWords({ exactly: 1, maxLength: 10 });
  const word = wordArr[0];

  axios
    .get(
      `https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${process.env.DICTIONARY_API_KEY}`
    )
    .then((data) => {
      const audioName = data.data[0].hwi.prs[0].sound.audio;
      const audioFile = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${audioName.charAt(
        0
      )}/${audioName}.mp3`;
      res.status(200).json({ word, audioFile });
    })
    .catch((err) => res.send(err));
});

app.get('/', function (req, res) {
  // req.query
  // req.params
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(process.env.PORT || 8080);
