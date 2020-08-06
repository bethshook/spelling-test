import React from 'react';
import './App.css';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import SpellingTest from './components/SpellingTest';
import theme from './theme';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SpellingTest />
      </ThemeProvider>
    </>
  );
}

export default App;
