import React from 'react';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import SpellingTest from './components/SpellingTest';
import theme from './theme';

function App() {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <SpellingTest />
      </MuiThemeProvider>
    </>
  );
}

export default App;
