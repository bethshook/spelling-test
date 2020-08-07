import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { Cached } from '@material-ui/icons';
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
}));

function WordCard({ word, audio, onRequest }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.label}
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          Unscramble the letters to spell the word. Play the audio for a hint.
        </Typography>
        <Typography variant="h2" component="h3" gutterBottom>
          {word}
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
