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
          submitNote={this.submitNote}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}>
        </NoteList>
        {
          this.state.selectedNote ?
          <Editor
            selectedNote={this.state.selectedNote}
            selectedNoteId={this.state.selectedNoteId}
            updateNote={this.updateNote}>
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

        this.setState({ notes: notes });
        if (notes && !this.state.notes[this.state.selectedNoteId]) {
          this.setState({ selectedNote: null, selectedNoteId: null});
        }
      });
  }

  submitNote = async (title) => {
    const note = {
      title: title,
      body: ''
    };
    
    const newlyAddedNote = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newNotes = {...this.state.notes, [newlyAddedNote.id]: note};

    await this.setState({ 
      notes: newNotes,
      selectedNoteId: newlyAddedNote.id,
      selectedNote: note
    });
  }

  updateNote = (id, note) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  }

  deleteNote = async (id) => {
    if (id === this.state.selectedNoteId) {
      await this.setState({ selectedNote: null, selectedNoteId: null });
    }
    
    await this.setState((state, props) => {
      delete state.notes[id];
      return { notes: state.notes };
    });

    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .delete()
  }

  selectNote = (note, id) => {
    this.setState({ selectedNote: note, selectedNoteId: id });
  }
}

export default App;
