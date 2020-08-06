import React, {useEffect, useState} from 'react';
import './App.css';
import API from './Api';
import shuffle from './helpers'
import ReactAudioPlayer from 'react-audio-player';

import {
  Button,
  Container,
  TextField,
} from '@material-ui/core';

function App() {

  const [challenge, setChallenge] = useState({});
  const [submission, setSubmission] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    // Get new word on load
    API.getWord()
      .then((res) => {
        setChallenge({...res.data, shuffled: shuffle(res.data.word)});
      })
      .catch((e) => {
        setError(e.response);
      })
  }, [])

  console.log(challenge)

  return (
    <Container>
      Spelling Test
      <p>Word: {challenge.shuffled}</p>
      <ReactAudioPlayer src={challenge.audioFile} controls />
        <form>
          <TextField
            autoComplete="off"
            fullWidth
            id="submission"
            variant="filled"
            type="text"
          />

          <Button
            variant="contained"
            disableElevation
            fullWidth
          >
            Submit
          </Button>
        </form>
    </Container>
  );
}

export default App;
