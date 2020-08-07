import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  InputAdornment,
  TextField,
  Typography,
  Zoom
} from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import WordCard from './WordCard';
import Score from './Score';
import { getWord, shuffle, submitWord } from '../helpers';
import successMessages from '../constants';

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
    display: 'inline',
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
    setFeedback({...feedback, correct: false});
    setSubmitted(true);
    submitWord({ word: challenge.word, submitted: submission })
      .then(() => {
        setFeedback({...feedback, correct: true});
        setScore({ correct: score.correct + 1, total: score.total + 1 });

      })
      .catch((e) => {
        setScore({ ...score, total: score.total + 1 });
        setFeedback({...feedback, incorrect: true, message: e.response.data.message})
      });
  };

  const handleRequestWord = () => {
    setSubmission('');
    setFeedback({...feedback, incorrect: false, message: ''});
    if (!submitted) setScore({ ...score, total: score.total + 1 });
    setSubmitted(false);

    getWord()
      .then((res) => {
        setFeedback({...feedback, correct: false, incorrect: false});
        setChallenge({ ...res.data, shuffled: shuffle(res.data.word) });
      })
      .catch(() => {
        setFeedback({ ...feedback, message: 'Something went wrong. Please try again.' });
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
          setFeedback({...feedback, message: 'Something went wrong. Please try again.' });
        });
    }
  }, [challenge.shuffled]);

  return (
    <Container maxWidth="sm">
      <Score correct={score.correct} total={score.total} />
      <WordCard
        word={challenge.shuffled}
        unscrambled={challenge.word}
        audio={challenge.audioFile}
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
              ) : null
            }}
            variant="outlined"
            value={submission}
            placeholder={challenge.shuffled}
            autoComplete="off"
            fullWidth
            id="submission"
            type="text"
            error={feedback.incorrect}
          />

          <Button
            onClick={handleSubmit}
            className={classes.submit}
            color="primary"
            size="large"
            variant="contained"
            disableElevation
            disabled={submitted}
          >
            Submit
          </Button>
        </Box>
        <Typography variant="h6" className={feedback.correct ? classes.success : classes.error}>
          {feedback.correct ? successMessages[Math.floor(Math.random() * 3)] : null}
            {feedback.incorrect ? (
              <>
                {feedback.message} The correct spelling is <Box className={classes.corrected}>{challenge.word}</Box>
              </>
              ) : null}
        </Typography>
      </form>
    </Container>
  );
}

export default SpellingTest;
