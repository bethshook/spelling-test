import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Confetti from 'react-confetti';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Zoom,
} from '@material-ui/core';
import { Cached, CheckCircle } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 275,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: theme.spacing(3),
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
  },
  action: {
    display: 'flex',
    justifyContent: 'center',
  },
  audio: {
    margin: '0 auto',
    display: 'block',
  },
  check: {
    color: theme.palette.success.main,
    fontSize: 40,
    lineHeight: 'inherit',
    marginLeft: theme.spacing(1),
  },
  word: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  incorrect: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.error.main,
  }
}));

function WordCard({ word, unscrambled, audio, onRequest, correct, error }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      {correct ? (
        <Confetti recycle={false} />
      ) : null}
      <CardContent>
        <Typography
          className={classes.label}
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          Unscramble the letters to spell the word. Play the audio for a hint.
        </Typography>
        <Typography className={error? classes.incorrect : classes.word} variant="h2" component="h3" gutterBottom>
          {correct || error ? unscrambled : word}
          {correct ? (
            <Zoom in={correct}>
              <CheckCircle className={classes.check} />
            </Zoom>
          ) : null}
        </Typography>
        <ReactAudioPlayer className={classes.audio} src={audio} controls />
      </CardContent>
      <CardActions className={classes.action}>
        <Button
          size="medium"
          onClick={onRequest}
          endIcon={<Cached color="primary" />}
        >
          New Word
        </Button>
      </CardActions>
    </Card>
  );
}

export default WordCard;
