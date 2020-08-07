import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: 14,
  },
  score: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(1),
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'flex-end'
  },
}));

function Score({ className, correct, total }) {
  const classes = useStyles();

  return (
    <Box className={classes.score}>
      <Box>
      <Typography className={classes.label}
                  color="textSecondary">Score</Typography>
    <Typography variant="h5">
      {correct} / {total}
</Typography>
      </Box>
    </Box>
  );
}

export default Score;
