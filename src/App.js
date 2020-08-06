import React, {useEffect, useState} from 'react';
import './App.css';
import API from './Api';

function App() {

  useEffect(() => {
    API.getWord()
      .then((res) => {
        console.log(res)
      })
      .catch((e) => {
        console.log(e)
      })
  })

  return (
    <div className="App">
      <header className="App-header" />
    </div>
  );
}

export default App;
