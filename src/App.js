import React from 'react';
import './App.css';
import NoteList from './components/NoteList';
import Editor from './components/Editor';

const firebase = require('firebase');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    }
  }

  render() {
    return (
      <div className="app-container">
        <NoteList
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          selectNote={this.selectNote}>
        </NoteList>
        {
          this.state.selectedNote ?
          <Editor
            selectedNote={this.state.selectedNote}>
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
        const notes = serverSnap.docs.map(_doc => {
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });

        setTimeout(() => {this.setState({ notes: notes })}, 1250);
      });
  }

  selectNote = (note, index) => {
    this.setState({ selectedNote: note, selectedNoteIndex: index});
  }
}

export default App;
