import React from 'react';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      error: '',
      titleLimit: 50,
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    const { value } = event.target;
    // Skilled: Membatasi judul maksimal 50 karakter menggunakan state
    if (value.length <= this.state.titleLimit) {
      this.setState({ title: value });
    }
  }

  onBodyChangeEventHandler(event) {
    this.setState({ body: event.target.value, error: '' });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    const { title, body } = this.state;

    // Advanced: Validasi isi catatan minimal 10 karakter
    if (body.length < 10) {
      this.setState({ error: 'Isi catatan minimal harus 10 karakter.' });
      return;
    }

    this.props.addNote({ title, body });
    
    // Basic: Reset form setelah submit
    this.setState({ title: '', body: '', error: '' });
  }

  render() {
    const remainingChars = this.state.titleLimit - this.state.title.length;

    return (
      <div className="note-input" data-testid="note-input">
        <h2>Buat catatan</h2>
        
        {/* Advanced: Tampilkan pesan error jika validasi gagal */}
        {this.state.error && (
          <p className="note-input__feedback--error">
            {this.state.error}
          </p>
        )}

        <form onSubmit={this.onSubmitEventHandler} data-testid="note-input-form">
          <p className={`note-input__title__char-limit ${remainingChars < 10 ? 'warning' : ''}`} data-testid="note-input-title-remaining">
            Sisa karakter: {remainingChars}
          </p>
          <input
            className="note-input__title"
            type="text"
            placeholder="Ini adalah judul ..."
            value={this.state.title}
            onChange={this.onTitleChangeEventHandler}
            required
            data-testid="note-input-title-field"
          />
          <textarea
            className="note-input__body"
            placeholder="Tuliskan catatanmu di sini ..."
            value={this.state.body}
            onChange={this.onBodyChangeEventHandler}
            required
            data-testid="note-input-body-field"
          />
          <button type="submit" data-testid="note-input-submit-button">Buat</button>
        </form>
      </div>
    );
  }
}

export default NoteInput;