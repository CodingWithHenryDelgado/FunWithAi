import './App.css';
import React from 'react';
import { Ai } from './components/AI/Ai';

function App() {
  const [darkMode, setDarkMode] = React.useState(localStorage.getItem('dark-mode') === 'true');

  React.useEffect(() => {
    localStorage.setItem('dark-mode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <div className='container'>
        <button className={`toggle ${darkMode ? 'dark' : 'light'}`} onClick={toggleDarkMode}>
          {darkMode ? "Light" : "Dark"}
        </button>
        <Ai />
      </div>
    </div>
  );
}

export default App;