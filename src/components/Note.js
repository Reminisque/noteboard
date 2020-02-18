import React from 'react';
import { removeHTMLTags } from '../helpers';
import { ReactComponent as DeleteIcon } from '../icons/delete.svg';
import './Note.css';

class ListItem extends React.Component {
  render() {
    const { title, body } = this.props;
    console.log(removeHTMLTags(title));

    return (
      <li className="note-container">
        <div className="note">
          <div className="note-text">
            <div className="note-title-text">{removeHTMLTags(title)}</div>
            <div className="note-body-text">{removeHTMLTags(body)}</div>
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
}

export default ListItem;