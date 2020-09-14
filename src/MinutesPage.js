import React from 'react';
import Note from './Note'

function MinutesPage(props) {

  const oneNote = props.notes.find(note => {
    if (note.id === props.match.params.notesId) {
      return note
    }
  })

  return (
    <article>
      <div>
        <h3>{oneNote.name}</h3>
        <p>{oneNote.modified}</p>
      </div>
      <p>{oneNote.content}</p>
    </article>
  )
}

export default MinutesPage