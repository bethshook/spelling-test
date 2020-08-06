import React, { useEffect, useState } from 'react';
import './App.css';
import ReactAudioPlayer from 'react-audio-player';
import { Button, Container, TextField } from '@material-ui/core';
import {shuffle, submitWord} from './helpers';

function App() {
  const [challenge, setChallenge] = useState({});
  const [submission, setSubmission] = useState('');
  const [score, setScore] = useState({
    correct: 0,
    total: 0
  })
  const [error, setError] = useState({});

  const handleChange = (event) => {
    setSubmission(event.target.value)
  }

  const handleSubmit = () => {
    submitWord({ word: challenge.word, submitted: submission })
      .then(() => {
        setScore({correct: score.correct + 1, total: score.total + 1})
      })
      .catch((e) => {
        setScore({...score, total: score.total + 1})
        setError(e.response.data)
      })
  };

  const handleRequestWord = () => {
    setSubmission('');
    setError({});
    API.getWord()
      .then((res) => {
        setChallenge({ ...res.data, shuffled: shuffle(res.data.word) });
      })
      .catch((e) => {
        setError({message: 'Sorry, something went wrong.'});
      });
  }

  useEffect(() => {
    handleRequestWord()
  }, []);

  return (
    <Container>
      Spelling Test
      <p>
        {score.correct} / {score.total}
      </p>
      <p>
        Word:
        {challenge.shuffled}
      </p>
      <ReactAudioPlayer src={challenge.audioFile} controls />
      <form>
        <TextField
          onChange={handleChange}
          value={submission}
          placeholder={challenge.shuffled}
          autoComplete="off"
          fullWidth
          id="submission"
          variant="filled"
          type="text"
          helperText={error.message}
          error={!!error.message}
        />

        <Button
        onClick={handleSubmit}
        variant="contained"
        disableElevation
        fullWidth
        disabled={!!error.message}
      >
        Submit
      </Button>
        <Button
          onClick={handleRequestWord}
          variant="contained"
          disableElevation
          fullWidth
        >
          New word
        </Button>
      </form>
    </Container>
  );
}

export default App;
