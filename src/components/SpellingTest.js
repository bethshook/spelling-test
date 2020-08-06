import React, { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Button, Container, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getWord, shuffle, submitWord } from '../helpers';

const useStyles = makeStyles((theme) => ({
  //
}));

function SpellingTest() {
  const classes = useStyles();
  const [challenge, setChallenge] = useState({});
  const [submission, setSubmission] = useState('');
  const [score, setScore] = useState({
    correct: 0,
    total: 0,
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({});

  const handleChange = (event) => {
    setSubmission(event.target.value);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    submitWord({ word: challenge.word, submitted: submission })
      .then(() => {
        setScore({ correct: score.correct + 1, total: score.total + 1 });
      })
      .catch((e) => {
        setScore({ ...score, total: score.total + 1 });
        setError(e.response.data);
      });
  };

  const handleRequestWord = () => {
    setSubmission('');
    setError({});
    if (!submitted) setScore({ ...score, total: score.total + 1 });
    setSubmitted(false);

    getWord()
      .then((res) => {
        setChallenge({ ...res.data, shuffled: shuffle(res.data.word) });
      })
      .catch(() => {
        setError({ message: 'Sorry, something went wrong. Try again.' });
      });
  };

  useEffect(() => {
    // Get first word
    if (!challenge.shuffled) {
      getWord()
        .then((res) => {
          setChallenge({ ...res.data, shuffled: shuffle(res.data.word) });
        })
        .catch(() => {
          setError({ message: 'Sorry, something went wrong.' });
        });
    }
  }, [challenge.shuffled]);

  return (
    <Container>
      Spelling Test
      <p>{`${score.correct} / ${score.total}`}</p>
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
          color="primary"
          disableElevation
          fullWidth
        >
          New word
        </Button>
      </form>
    </Container>
  );
}

export default SpellingTest;
