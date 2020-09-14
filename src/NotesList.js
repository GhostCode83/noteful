import React from 'react'
import Note from './Note'

function NotesList(props) {
  const notes = props.notes.map((note) => {
    let noteName = note.name;
    let noteDate = note.modified;
    let noteId = note.id;
    return (<Note
      noteId={noteId}
      name={noteName}
      date={noteDate}
    />)
  })

  return (
    <div>
      <ul>
        {notes}
      </ul>
      <button>Add Note</button>
    </div>
  )
}

export default NotesList