import './App.css';
import React, { useState } from 'react';
import { Label, Note } from "./types"; 
import { dummyNotesList } from './constants';
//import { ClickCounter } from './starterfiles/hooksExercise'; 

function App() {
  const [notes, setNotes] = useState(dummyNotesList);
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  };
  const [createNote, setCreateNote] = useState(initialNote);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const newNote = { ...createNote, id: notes.length + 1 };
    setNotes([newNote, ...notes]);
    setCreateNote(initialNote);
  };

  const deleteNoteHandler = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const updateNoteHandler = (id: number, field: keyof Note, value: string) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, [field]: value } : note
    ));
  };

  return (
    <div className='app-container'>
      <form className="note-form" onSubmit={createNoteHandler}>
        <div>
          <input
            placeholder="Note Title"
            value={createNote.title}
            onChange={(event) => setCreateNote({ ...createNote, title: event.target.value })}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Note Content"
            value={createNote.content}
            onChange={(event) => setCreateNote({ ...createNote, content: event.target.value })}
            required
          />
        </div>
        <div>
          <select
            value={createNote.label}
            onChange={(event) => setCreateNote({ ...createNote, label: event.target.value as Label })}
            required
          >
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>
        <div><button type="submit">Create Note</button></div>
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <button onClick={() => deleteNoteHandler(note.id)}>x</button>
            </div>
            <h2 contentEditable onBlur={(event) => updateNoteHandler(note.id, 'title', event.target.innerText)}>{note.title}</h2>
            <p contentEditable onBlur={(event) => updateNoteHandler(note.id, 'content', event.target.innerText)}>{note.content}</p>
            <p>{note.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;