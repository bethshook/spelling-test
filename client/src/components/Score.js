import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

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
    justifyContent: 'flex-end',
  },
}));

function Score({ correct, total }) {
  const classes = useStyles();

  return (
    <Box className={classes.score}>
      <Box>
        <Typography className={classes.label} color="textSecondary">
          Score
        </Typography>
        <Typography variant="h5">
          {correct} /{total}
        </Typography>
      </Box>
    </Box>
  );
}

Score.propTypes = {
  correct: PropTypes.number,
  total: PropTypes.number,
};

Score.defaultProps = {
  correct: 0,
  total: 0,
};

export default Score;
