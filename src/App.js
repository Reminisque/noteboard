import React from 'react';
import './App.css';
import NoteList from './components/NoteList';
import Editor from './components/Editor';

const firebase = require('firebase');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedNoteId: null,
      selectedNote: null,
      notes: null
    }
  }

  render() {
    return (
      <div className="app-container">
        <NoteList
          notes={this.state.notes}
          selectNote={this.selectNote}>
        </NoteList>
        {
          this.state.selectedNote ?
          <Editor
            selectedNote={this.state.selectedNote}
            selectedNoteId={this.state.selectedNoteId}>
          </Editor> : null
        }
      </div>
    );
  }

  componentDidMount() {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverSnap => {
        let notes = {};
        serverSnap.docs.forEach((_doc) => {
          notes[_doc.id] = _doc.data();
        });

        setTimeout(() => {this.setState({ notes: notes })}, 1250);
      });
  }

  selectNote = (note, id) => {
    this.setState({ selectedNote: note, selectedNoteId: id });
  }
}

export default App;
