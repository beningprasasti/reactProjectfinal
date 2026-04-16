import React from 'react';
import NoteItem from './NoteItem';

function NotesList({ notes, onDelete, onArchive, searchKeyword, dataTestId }) {
  // Basic: Validasi catatan kosong
  if (notes.length === 0) {
    return (
      <div className="notes-list" data-testid={dataTestId}>
        <p className="notes-list__empty-message" data-testid={`${dataTestId}-empty`}>
          Tidak ada catatan
        </p>
      </div>
    );
  }

  // Advanced: Mengelompokkan catatan per kombinasi bulan-tahun
  const groupedNotes = notes.reduce((groups, note) => {
    const date = new Date(note.createdAt);
    const monthYear = date.toLocaleString('id-ID', { month: 'long', year: 'numeric' });
    if (!groups[monthYear]) groups[monthYear] = [];
    groups[monthYear].push(note);
    return groups;
  }, {});

  return (
    <div className="notes-list" data-testid={dataTestId}>
      {Object.entries(groupedNotes).map(([monthYear, items]) => (
        <section key={monthYear} className="notes-group">
          <header className="notes-group__header">
            <h4>{monthYear}</h4>
            <span>{items.length} item</span>
          </header>
          <div className="notes-list__grid">
            {items.map((note) => (
              <NoteItem
                key={note.id}
                note={note}
                onDelete={onDelete}
                onArchive={onArchive}
                searchKeyword={searchKeyword}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default NotesList;