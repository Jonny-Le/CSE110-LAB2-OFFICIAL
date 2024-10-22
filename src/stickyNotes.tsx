import './App.css';
import React, { useState } from 'react';
import { Label, Note } from './types'; 
import { dummyNotesList } from './constants';

export const StickyNotes = () => {
  const [notes, setNotes] = useState<Note[]>(dummyNotesList);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const initialNote: Note = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    isLiked: false,
  };
  
  const [createNote, setCreateNote] = useState<Note>(initialNote);

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

  const toggleLikeDislike = (id: number) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, isLiked: !note.isLiked } : note
    ));
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Note creation form */}
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

      {/* Displaying Notes */}
      <div className="notes-grid">
        {notes
          .sort((a, b) => {
            if (a.isLiked && !b.isLiked) return -1; 
            if (!a.isLiked && b.isLiked) return 1;  
            return a.id - b.id; 
          })
          .map((note) => (
            <div key={note.id} className="note-item">
              <div className="notes-header">
                <button onClick={() => deleteNoteHandler(note.id)}>x</button>
              </div>
              <h2 contentEditable onBlur={(event) => updateNoteHandler(note.id, 'title', event.target.innerText)}>
                {note.title}
              </h2>
              <p contentEditable onBlur={(event) => updateNoteHandler(note.id, 'content', event.target.innerText)}>
                {note.content}
              </p>
              <p>{note.label}</p>

              {/* Like / Dislike Button */}
              <button onClick={() => toggleLikeDislike(note.id)}>
                {note.isLiked ? "Dislike" : "Like"}
              </button>
            </div>
          ))}
      </div>

      {/* Toggle Theme Button */}
      <button onClick={toggleTheme}>
        {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
  );
};