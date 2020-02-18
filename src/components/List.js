import React from 'react';
import './List.css';

class List extends React.Component {
  render() {
    return (
      <ul className="ui-list">{this.props.children}</ul>
    );
  }
}

export default List;