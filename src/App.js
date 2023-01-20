import './App.css';
import React from 'react';
import { Ai } from './components/AI/Ai';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <h1 className='title'>Fun with AI</h1>
        <Ai />
      </div>
    </div>
  );
}

export default App;
