import React from 'react'
import Note from './Note'
import NotefulContext from './NotefulContext'
import { Link } from 'react-router-dom';
import './Notes.css';

class NotesList extends React.Component {
  static contextType = NotefulContext;

  render() {
    const notes = this.context.notes.map((note) => {
      let noteName = note.name;
      let noteDate = note.modified;
      let noteId = note.id;
      return (<Note
        key={noteId}
        noteId={noteId}
        name={noteName}
        date={noteDate}
      />)
    })

    return (

      <div className='right-column'>
        <ul>
          {notes}
        </ul>
        <Link to={`/AddNote`}>
          <button>
            Add Note
        </button>
        </Link>
      </div>

    )
  }
}

export default NotesList
