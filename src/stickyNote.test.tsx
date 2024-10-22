import { render, screen, fireEvent } from '@testing-library/react';
import { StickyNotes } from './stickyNotes';
import { dummyNotesList } from './constants';

describe('Sticky Notes Component', () => {
  test('should display all notes on the screen', () => {
    render(<StickyNotes />);

    dummyNotesList.forEach((note) => {
      expect(screen.getByText(note.title)).toBeInTheDocument();
      expect(screen.getByText(note.content)).toBeInTheDocument();
    });
  });

  test('should update a note title and content', () => {
    render(<StickyNotes />);

    const noteTitle = screen.getByText(dummyNotesList[0].title);
    const noteContent = screen.getByText(dummyNotesList[0].content);

    fireEvent.blur(noteTitle, { target: { innerText: 'Updated Title' } });
    fireEvent.blur(noteContent, { target: { innerText: 'Updated Content' } });

    expect(noteTitle.innerHTML).toBe('Updated Title');
    expect(noteContent.innerHTML).toBe('Updated Content');
  });

  test('should delete a note when the delete button is clicked', () => {
    render(<StickyNotes />);

    const deleteButton = screen.getAllByText('x')[0];

    fireEvent.click(deleteButton);

    expect(screen.queryByText(dummyNotesList[0].title)).not.toBeInTheDocument();
  });

  test('should display "No notes available" when there are no notes', () => {
    render(<StickyNotes />);

    const noNotesMessage = screen.queryByText(/no notes available/i);
    expect(noNotesMessage).toBeInTheDocument();
  });
});