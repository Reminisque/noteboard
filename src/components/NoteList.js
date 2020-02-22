import React from 'react';
import List from './List';
import Note from './Note';
import Divider from './Divider';
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
    const { notes } = this.props;
    if (notes) {
      return (
        <div className="notelist-container">
          <button
            className="new-note-btn ui-btn"
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
                  className="new-note-submit-btn ui-btn"
                  onClick={() => this.submitNote(this.state.title)}>
                  Submit Note
              </button>
              </div> : null
          }
          <List>
            {
              Object.keys(notes).map((id) => {
                return (
                  <div key={id}>
                    <Note
                      _note={notes[id]}
                      _id={id}
                      deleteNote={this.deleteNote}
                      selectNote={this.selectNote}>
                    </Note>
                    <Divider></Divider>
                  </div>
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
    this.setState({ title: '', addingNote: !this.state.addingNote });
  }

  submitNote = (t) => {
    t === '' ? this.props.submitNote('Untitled') : this.props.submitNote(t);
    this.toggleAddingNote();
  }
  
  deleteNote = (id) => this.props.deleteNote(id);

  selectNote = (n, i) => this.props.selectNote(n, i);
}

export default NoteList;