import React, { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Button, Card, CardActions, CardContent, Container, TextField, Typography } from '@material-ui/core';
import { Cached } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { getWord, shuffle, submitWord } from '../helpers';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: theme.spacing(3),
  },
  title: {
    fontSize: 14,
  },
  action: {
    display: 'flex',
    justifyContent: 'center'
  }
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
      <p>{`${score.correct} / ${score.total}`}</p>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" component="h1" gutterBottom>
            Spelling Test
          </Typography>
          <Typography variant="h3" component="h2" gutterBottom>
            {challenge.shuffled}
          </Typography>
          <ReactAudioPlayer src={challenge.audioFile} controls />
        </CardContent>
        <CardActions className={classes.action}>
          <Button size="medium" onClick={handleRequestWord}>
            New Word <Cached marginLeft={1} />
          </Button>
        </CardActions>
      </Card>
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
      </form>
    </Container>
  );
}

export default SpellingTest;
