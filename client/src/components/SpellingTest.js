import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
  Zoom,
} from '@material-ui/core';
import { CheckCircle, Error } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import WordCard from './WordCard';
import Score from './Score';
import shuffle from '../helpers';
import successMessages from '../constants';
import API from '../Api';

const useStyles = makeStyles((theme) => ({
  buttonIcon: {
    marginLeft: theme.spacing(1),
  },
  form: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  input: {
    backgroundColor: 'white',
    fontSize: 24,
  },
  submit: {
    marginLeft: theme.spacing(2),
  },
  check: {
    color: theme.palette.success.main,
  },
  success: {
    color: theme.palette.success.main,
    textAlign: 'center',
  },
  error: {
    color: theme.palette.error.main,
    fontWeight: 400,
    display: 'inline-flex',
    alignItems: 'center',
  },
  errorIcon: {
    color: theme.palette.error.main,
    marginRight: theme.spacing(1),
  },
  corrected: {
    fontWeight: 500,
    fontSize: 'inherit',
    textDecoration: 'underline',
    display: 'inline',
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
  const [fetching, setFetching] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState({
    correct: false,
    incorrect: false,
    message: '',
  });

  const handleChange = (event) => {
    setSubmission(event.target.value);
  };

  const handleSubmit = () => {
    setFeedback({ ...feedback, correct: false });
    setSubmitted(true);
    const word = challenge.word.toLowerCase();

    API.submitWord({ word, submitted: submission })
      .then(() => {
        setFeedback({ ...feedback, correct: true });
        setScore({ correct: score.correct + 1, total: score.total + 1 });
      })
      .catch((e) => {
        setScore({ ...score, total: score.total + 1 });
        setFeedback({
          ...feedback,
          incorrect: true,
          message: e.response.data.message,
        });
      });
  };

  const handleRequestWord = () => {
    setFetching(true);
    setSubmission('');
    setFeedback({ ...feedback, correct: false, incorrect: false, message: '' });
    if (!submitted) setScore({ ...score, total: score.total + 1 });
    setSubmitted(false);

    API.getWord()
      .then((res) => {
        setFetching(false);
        setChallenge({ ...res.data, shuffled: shuffle(res.data.word) });
      })
      .catch(() => {
        setFetching(false);
        setFeedback({
          ...feedback,
          message: 'Something went wrong. Please try again.',
        });
      });
  };

  useEffect(() => {
    // Get first word
    if (!challenge.shuffled) {
      setFetching(true);
      API.getWord()
        .then((res) => {
          setFetching(false);
          setChallenge({ ...res.data, shuffled: shuffle(res.data.word) });
        })
        .catch(() => {
          setFetching(false);
          setFeedback({
            ...feedback,
            message: 'Something went wrong. Please try again.',
          });
        });
    }
  }, [challenge.shuffled, feedback]);

  return (
    <Container maxWidth="sm">
      <Score correct={score.correct} total={score.total} />
      <WordCard
        word={challenge.shuffled}
        unscrambled={challenge.word}
        audio={challenge.audioFile}
        fetching={fetching}
        onRequest={handleRequestWord}
        correct={feedback.correct}
        error={feedback.incorrect}
      />
      <form>
        <Box className={classes.form}>
          <TextField
            onChange={handleChange}
            InputProps={{
              classes: {
                input: classes.input,
              },
              endAdornment: feedback.correct ? (
                <InputAdornment position="end">
                  <Zoom in={feedback.correct}>
                    <CheckCircle className={classes.check} />
                  </Zoom>
                </InputAdornment>
              ) : null,
            }}
            variant="outlined"
            value={submission}
            placeholder={challenge.shuffled}
            autoComplete="off"
            fullWidth
            id="submission"
            type="text"
            error={feedback.incorrect}
            data-cy="input"
          />

          <Button
            onClick={handleSubmit}
            className={classes.submit}
            color="primary"
            size="large"
            variant="contained"
            disableElevation
            disabled={submitted}
            data-cy="submit"
          >
            Submit
          </Button>
        </Box>
        <Typography
          data-cy="helper-text"
          variant="h6"
          className={feedback.correct ? classes.success : classes.error}
        >
          {feedback.correct
            ? successMessages[Math.floor(Math.random() * 3)]
            : null}
          {feedback.incorrect ? (
            <>
              <Zoom in>
                <Error className={classes.errorIcon} />
              </Zoom>
              {feedback.message}
            </>
          ) : null}
        </Typography>
      </form>
    </Container>
  );
}

export default SpellingTest;
