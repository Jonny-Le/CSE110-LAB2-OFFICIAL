import './App.css';
import React, { useState } from 'react';
import { Label, Note } from "./types"; 
import { dummyNotesList } from './constants';
import { ClickCounter } from './starterfiles/hooksExercise'; 

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Note creation form */}
      <form className="note-form">
        <div>
          <input placeholder="Note Title" />
        </div>
        <div>
          <textarea placeholder="Note Content"></textarea>
        </div>
        <div>
          <button type="submit">Create Note</button>
        </div>
      </form>

      {/* Dark mode toggle button placed below the form */}
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>

      {/* Notes grid on the right */}
      <div className="notes-grid">
        {dummyNotesList.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <button>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>{note.label}</p>
          </div>
        ))}

        {/* ClickCounter button */}
        <div className="clickCounter">
          <ClickCounter />
        </div>
      </div>
    </div>
  );
}

export default App;