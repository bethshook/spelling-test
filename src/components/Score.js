import React from 'react';
import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  score: {
    margin: theme.spacing(2),
    textAlign: 'right',
  },
  num: {
    display: 'inline',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    width: 50,
    height: 50,
  },
}));

function Score({ correct, total }) {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.num}>{correct}</Box> out of
      <Box className={classes.num}>{total}</Box>
{' '}
words
</>
  );
}

export default Score;
