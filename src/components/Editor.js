import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import { ReactComponent as EditIcon } from '../icons/edit.svg';
import './Editor.css';

class Editor extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      title: '',
      body: '',
    };
  }

  render() {
    return (
      <div className="editor-container">
        <div className="note-title-container">
          <EditIcon></EditIcon>
          <input
            type="text"
            className="note-title-input"
            placeholder="Untitled"
            value={this.state.title}
            onChange={(e) => this.updateTitle(e.target.value)}>
          </input>
        </div>
        <ReactQuill
          value={this.state.body}
          onChange={this.updateBody}>
        </ReactQuill>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ 
      id: this.props.selectedNoteId,
      title: this.props.selectedNote.title,
      body: this.props.selectedNote.body
    });
  }

  componentDidUpdate() {
    if (this.state.id !== this.props.selectedNoteId) {
      this.setState({ 
        id: this.props.selectedNoteId,
        title: this.props.selectedNote.title,
        body: this.props.selectedNote.body
      });
    }
  }

  updateTitle = async (val) => {
    await this.setState({ title: val });
    this.update();
  }

  updateBody = async (val) => {
    await this.setState({ body: val });
    this.update();
  };

  update = debounce(() => {
    this.props.updateNote(this.state.id, {
        title: this.state.title,
        body: this.state.body
    });
    console.log(`Updated note ${this.state.title} (ID:${this.state.id})`);
  }, 1500);
}

export default Editor;