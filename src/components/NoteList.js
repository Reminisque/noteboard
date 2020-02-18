import React from 'react';
import List from './List';
import Note from './Note';
import LinearLoading from './LinearLoading';
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
    if (notes) {
      return (
        <div className="notelist-container">
          <button
            className="new-note-btn"
            onClick={this.toggleAddingNote}>
            {this.state.addingNote ? "Cancel" : "New Note"}
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
          <List>
            {
              notes.map((_note, _index) => {
                return (
                  <Note key={_index}
                    title={_note.title}
                    body={_note.body}>
                  </Note>
                );
              })
            }
          </List>
        </div>
      );
    } else {
      return (
        <div className="notelist-container">
          <div className="notelist-loading-container">
            Fetching Notes...
            <div className="notelist-loadbar-container">
              <LinearLoading></LinearLoading>
            </div>
          </div>
        </div>
      );
    }
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