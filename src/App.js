import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Planets from './components/Planets';

function App() {
  return (
    <Provider>
      <Planets />
    </Provider>
  );
}

export default App;
