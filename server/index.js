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

// Recursive function checks for words with length > 4
const findWord = (params) => {
  const wordArr = randomWords(params);
  const word = wordArr[0];

  if (word.length > 4) {
    return word
  } else {
    return findWord(params);
  }
}

app.get('/word', function (req, res) {
  const dictWord = findWord({ exactly: 1, maxLength: 10 });

  axios
    .get(
      `https://www.dictionaryapi.com/api/v3/references/learners/json/${dictWord}?key=${process.env.DICTIONARY_API_KEY}`
    )
    .then((data) => {
      const word = (data.data[0].hwi.hw).replace(/\*/g, '');
      const audioName = data.data[0].hwi.prs[0].sound.audio;
      const audioFile = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${audioName.charAt(0)}/${audioName}.mp3`;
      res.status(200).json({ word, audioFile });
    })
    .catch((err) => res.send(err));
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(process.env.PORT || 8080);
