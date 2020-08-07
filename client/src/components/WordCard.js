import React from 'react';
import PropTypes from 'prop-types';
import ReactAudioPlayer from 'react-audio-player';
import Confetti from 'react-confetti';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
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
    justifyContent: 'center',
  },
  incorrect: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.error.main,
  },
  wordContainer: {
    height: 110,
  }
}));

function WordCard({
  word,
  unscrambled,
  audio,
  fetching,
  onRequest,
  correct,
  error,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      {correct ? <Confetti recycle={false} /> : null}
      <CardContent>
        <Typography
          className={classes.label}
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          Unscramble the letters to spell the word. Play the audio for a hint.
        </Typography>
        <Box className={classes.wordContainer}>
        <Typography
          className={error ? classes.incorrect : classes.word}
          variant="h2"
          component="h3"
          data-cy="word"
          gutterBottom
        >
          {fetching ? <CircularProgress size='4rem' />
            : (correct || error ? unscrambled : word)
          }

          {correct ? (
            <Zoom in={correct}>
              <CheckCircle className={classes.check} />
            </Zoom>
          ) : null}
        </Typography>
        </Box>
        <ReactAudioPlayer className={classes.audio} src={audio} controls />
      </CardContent>
      <CardActions className={classes.action}>
        <Button
          size="medium"
          onClick={onRequest}
          disabled={fetching}
          endIcon={
            <Cached color="primary" />
          }
        >
          New Word
        </Button>
      </CardActions>
    </Card>
  );
}

WordCard.propTypes = {
  word: PropTypes.string,
  unscrambled: PropTypes.string,
  audio: PropTypes.string,
  fetching: PropTypes.bool,
  onRequest: PropTypes.func,
  error: PropTypes.bool,
  correct: PropTypes.bool,
};

WordCard.defaultProps = {
  word: '',
  unscrambled: '',
  audio: '',
  fetching: false,
  onRequest: () => {},
  error: false,
  correct: false,
};

export default WordCard;
