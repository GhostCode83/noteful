import React from 'react'

function FolderNotesList(props) {
  const notes = props.notes.map((note, ind) => {
    let noteName = note.name;
    let noteDate = note.modified;
    let noteId = note.id;
   
    return <div key={ind}>
      <h2>{noteName}</h2>
      <p>{noteDate}</p>
    </div>
  })

  return (
    <div>
Notes from folder    </div>
  )
}
/*  const notes = props.notes.find((note, ind) => {
    note.id === props.match.params.folderId
   
    return <div key={ind}>
      <h2>{note}</h2>
    </div>
  })
  */

export default FolderNotesList