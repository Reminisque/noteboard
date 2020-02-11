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
          notes={this.state.notes}>
        </NoteList>
        <Editor
          selectedNote={this.state.selectedNote}>
        </Editor>
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

        console.log(notes);
        this.setState({ notes: notes });
      });
  }
}

export default App;
