import React from 'react';
import { getInitialData } from '../utils';
import NoteInput from './NoteInput';
import NotesList from './NotesList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // Basic: Simpan data awal
      notes: getInitialData(),
      searchKeyword: '',
    };

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
    this.onDeleteHandler = this.onDeleteHandler.bind(this);
    this.onArchiveHandler = this.onArchiveHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
  }

  onAddNoteHandler({ title, body }) {
    const newNote = {
      id: +new Date(),
      title,
      body,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    this.setState((prevState) => ({
      notes: [...prevState.notes, newNote],
    }));
  }

  onDeleteHandler(id) {
    // Basic: Gunakan filter untuk menghapus
    const notes = this.state.notes.filter((note) => note.id !== id);
    this.setState({ notes });
  }

  onArchiveHandler(id) {
    // Advanced: Gunakan map untuk toggle nilai archived
    const notes = this.state.notes.map((note) => 
      note.id === id ? { ...note, archived: !note.archived } : note
    );
    this.setState({ notes });
  }

  onSearchHandler(event) {
    // Skilled: Simpan keyword ke state
    this.setState({ searchKeyword: event.target.value });
  }

  render() {
    const { notes, searchKeyword } = this.state;

    // Skilled: Filter berdasarkan keyword (case-insensitive)
    const filteredNotes = notes.filter((note) =>
      note.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      note.body.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    // Advanced: Urutkan berdasarkan tanggal terbaru (descending)
    const sortedNotes = [...filteredNotes].sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Advanced: Pisahkan catatan aktif dan arsip
    const activeNotes = sortedNotes.filter((note) => !note.archived);
    const archivedNotes = sortedNotes.filter((note) => note.archived);

    return (
      <div className="note-app" data-testid="note-app">
        <div className="note-app__header" data-testid="note-app-header">
          <h1>Notes</h1>
          <div className="note-search">
            <input 
              type="text" 
              placeholder="Cari catatan..." 
              value={searchKeyword}
              onChange={this.onSearchHandler} 
            />
          </div>
        </div>
        <div className="note-app__body" data-testid="note-app-body">
          <NoteInput addNote={this.onAddNoteHandler} />
          
          <section aria-labelledby="active-notes-title" data-testid="active-notes-section">
            <h2 id="active-notes-title">Catatan Aktif ({activeNotes.length})</h2>
            <NotesList
              notes={activeNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
              searchKeyword={searchKeyword}
              dataTestId="active-notes-list"
            />
          </section>

          <section aria-labelledby="archived-notes-title" data-testid="archived-notes-section">
            <h2 id="archived-notes-title">Arsip ({archivedNotes.length})</h2>
            <NotesList
              notes={archivedNotes}
              onDelete={this.onDeleteHandler}
              onArchive={this.onArchiveHandler}
              searchKeyword={searchKeyword}
              dataTestId="archived-notes-list"
            />
          </section>
        </div>
      </div>
    );
  }
}

export default App;