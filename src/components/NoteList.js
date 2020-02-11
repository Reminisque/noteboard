import React from 'react';
import './NoteList.css';

class NoteList extends React.Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: ''
    };
  }

  render() {
    const { notes, selectedNoteIndex } = this.props;
    return (
      <div className="notelist-container">
        <button 
          className="new-note-btn"
          onClick={this.toggleAddingNote}>
          { this.state.addingNote ? "Cancel" : "New Note" }
        </button>
        {
          this.state.addingNote ? 
            <div>
              <input type="text"
                className="new-note-input"
                placeholder="Enter note title"
                onChange={(e) => this.updateTitle(e.target.value)}>
              </input>
              <button
                className="new-note-submit-btn"
                onClick={this.submitNote}>
                Submit Note
              </button>
            </div> : null
        }
      </div>
    );
  }

  updateTitle = (val) => {
    this.setState({ title: val });
  };

  toggleAddingNote = () => {
    this.setState({ title: null, addingNote: !this.state.addingNote });
  }

  submitNote = () => {
    console.log("Submitted note: ", this.state.title);
  }
}

export default NoteList;