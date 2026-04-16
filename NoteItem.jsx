import React from 'react';
import { showFormattedDate } from '../utils';
import NoteActionButton from './NoteActionButton';

function NoteItem({ note, onDelete, onArchive, searchKeyword }) {
  // Advanced: Fungsi untuk menyorot kata kunci pencarian (case-insensitive)
  const highlightText = (text, highlight) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === highlight.toLowerCase() 
            ? <mark key={i}>{part}</mark> 
            : part
        )}
      </span>
    );
  };

  return (
    <div className="note-item" data-testid="note-item" data-note-id={note.id}>
      <div className="note-item__content" data-testid="note-item-content">
        <h3 className="note-item__title" data-testid="note-item-title">
          {highlightText(note.title, searchKeyword)}
        </h3>
        <p className="note-item__date" data-testid="note-item-date">
          {showFormattedDate(note.createdAt)}
        </p>
        <p className="note-item__body" data-testid="note-item-body">
          {highlightText(note.body, searchKeyword)}
        </p>
      </div>
      <div className="note-item__action" data-testid="note-item-action">
        <NoteActionButton 
          variant="delete" 
          onClick={() => onDelete(note.id)} 
          label="Delete"
          dataTestId="note-item-delete-button"
        />
        <NoteActionButton 
          variant="archive" 
          onClick={() => onArchive(note.id)} 
          label={note.archived ? 'Pindahkan' : 'Arsipkan'}
          dataTestId="note-item-archive-button"
        />
      </div>
    </div>
  );
}

export default NoteItem;