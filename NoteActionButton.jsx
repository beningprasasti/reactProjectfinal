import React from 'react';

function NoteActionButton({ variant, onClick, label, dataTestId }) {
  const className = variant === 'delete' 
    ? 'note-item__delete-button' 
    : 'note-item__archive-button';

  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      data-testid={dataTestId}
    >
      {label}
    </button>
  );
}

export default NoteActionButton;