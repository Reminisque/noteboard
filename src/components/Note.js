import React from 'react';
import { removeHTMLTags } from '../helpers';
import { ReactComponent as DeleteIcon } from '../icons/delete.svg';
import './Note.css';

class Note extends React.Component {
  render() {
    const { _note, _id} = this.props;

    return (
      <li className="note-container">
        <div className="note"
          onClick={() => this.selectNote(_note, _id)}>
          <div className="note-text">
            <div className="note-title-text">{removeHTMLTags(_note.title)}</div>
            <div className="note-body-text">{removeHTMLTags(_note.body).substring(0, 64)}</div>
          </div>
          <div className="note-delete-container">
            <button className="note-delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                this.deleteNote(_id);}}>
              <DeleteIcon className="note-delete-icon"></DeleteIcon>
            </button>
          </div>
        </div>
      </li>
    );
  }

  deleteNote = (id) => {
    const msg = `
      Are you sure you want to delete note: ${this.props._note.title}`;
    if (window.confirm(msg)) {
      this.props.deleteNote(id);
    } 
  }

  selectNote = (n, i) => this.props.selectNote(n, i);
}

export default Note;