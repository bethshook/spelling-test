const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const axios = require('axios');

require('dotenv').config({ path: '../.env' });
const randomWords = require('random-words');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

// Recursive function checks for words with length > 4
const findWord = (params) => {
  const wordArr = randomWords(params);
  const word = wordArr[0];

  if (word.length > 4) {
    return word;
  }
  return findWord(params);
};

app.get('/word', (req, res) => {
  const dictWord = findWord({ exactly: 1, maxLength: 10 });

  axios
    .get(
      `https://www.dictionaryapi.com/api/v3/references/learners/json/${dictWord}?key=${process.env.DICTIONARY_API_KEY}`
    )
    .then((data) => {
      const word = data.data[0].hwi.hw.replace(/\*/g, '');
      const audioName = data.data[0].hwi.prs[0].sound.audio;
      const audioFile = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${audioName.charAt(
        0
      )}/${audioName}.mp3`;
      res.status(200).json({ word, audioFile });
    })
    .catch((err) => res.send(err));
});

app.post('/word', (req, res) => {
  if (req.body.word === req.body.submitted) {
    res.status(200).json({ ...req.body, message: 'Correct!' });
  } else {
    res.status(422).send({
      ...req.body,
      message: 'Incorrect!',
    });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(process.env.PORT || 8080);
