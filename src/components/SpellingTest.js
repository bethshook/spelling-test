import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
} from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import WordCard from './WordCard';
import Score from './Score';
import { getWord, shuffle, submitWord } from '../helpers';

const useStyles = makeStyles((theme) => ({
  buttonIcon: {
    marginLeft: theme.spacing(1),
  },
  form: {
    display: 'flex',
  },
  input: {
    backgroundColor: 'white',
    fontSize: 24,
  },
  submit: {
    marginLeft: theme.spacing(2),
  },
  num: {
    display: 'inline',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    width: 50,
    height: 50,
  },
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
    <Container maxWidth="sm">
      <Score correct={score.correct} total={score.total} />
      <WordCard
        word={challenge.shuffled}
        audio={challenge.audioFile}
        onRequest={handleRequestWord}
      />
      <form>
        <Box className={classes.form}>
          <TextField
            onChange={handleChange}
            InputProps={{
              classes: {
                input: classes.input,
              },
            }}
            variant="outlined"
            value={submission}
            placeholder={challenge.shuffled}
            autoComplete="off"
            fullWidth
            id="submission"
            type="text"
            helperText={error.message}
            error={!!error.message}
          />

          <Button
            onClick={handleSubmit}
            className={classes.submit}
            color="primary"
            size="large"
            variant="contained"
            disableElevation
            disabled={!!error.message}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default SpellingTest;
