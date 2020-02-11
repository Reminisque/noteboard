import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
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
        <input
          type="text"
          className="note-title-input"
          placeholder="Untitled"
          onChange={(e) => this.updateTitle(e.target.value)}>
        </input>
        <ReactQuill
          value={this.state.body}
          onChange={this.updateBody}>
        </ReactQuill>
      </div>
    );
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
    console.log("Updating database: \n", this.state);
  }, 1500);
}

export default Editor;