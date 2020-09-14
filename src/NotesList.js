import React from 'react'

function NotesList(props) {
  const notes = props.notes.map((note) => {
    let noteName = note.name;
    let noteDate = note.modified;
    let noteId = note.id;
    return <li key={noteId}>
      <h2>{noteName}</h2>
      <p>{noteDate}</p>
      <button>Add Note</button>
    </li>
  })

  return (
    <ul>
      {notes}
    </ul>
  )
}

export default NotesList