import React from 'react'
import Note from './Note'
import NotefulContext from './NotefulContext';
import PropTypes from 'prop-types';

class FolderNotesList extends React.Component {

  static contextType = NotefulContext;

  render() {
    const notesList = this.props.notes.filter(note => {
      if (note.folderId === Number(this.props.match.params.folderId)) {
        return note
      }
    })

    return <div>{notesList.map(note => {
      let noteId = note.id;
      let noteName = note.name;
      let noteDate = note.modified
      return (
        <Note
          key={noteId}
          noteId={noteId}
          name={noteName}
          date={noteDate}
        />
      )
    })}</div>
  }
}

FolderNotesList.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
}

export default FolderNotesList