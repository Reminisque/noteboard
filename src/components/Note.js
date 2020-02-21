import React from 'react';
import { removeHTMLTags } from '../helpers';
import { ReactComponent as DeleteIcon } from '../icons/delete.svg';
import './Note.css';

class Note extends React.Component {
  render() {
    const { _note, _index } = this.props;

    return (
      <li className="note-container">
        <div className="note"
          onClick={() => this.selectNote(_note, _index)}>
          <div className="note-text">
            <div className="note-title-text">{removeHTMLTags(_note.title)}</div>
            <div className="note-body-text">{removeHTMLTags(_note.body).substring(0, 50)}</div>
          </div>
          <div className="note-delete-container">
            <button className="note-delete-btn">
              <DeleteIcon className="note-delete-icon"></DeleteIcon>
            </button>
          </div>
        </div>
      </li>
    );
  }

  selectNote = (n, i) => this.props.selectNote(n, i);
}

export default Note;