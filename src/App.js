import React from 'react';
import './App.css';
import {
  AppBar,
  Button,
  CssBaseline,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import SpellingTest from './components/SpellingTest';
import theme from './theme';

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h1" className={classes.title}>
            Spelling Test
          </Typography>
          <Button color="inherit" href="https://www.linkedin.com/in/bethshook/">
            About Beth
          </Button>
        </Toolbar>
      </AppBar>
      <SpellingTest />
    </MuiThemeProvider>
  );
}

export default App;
