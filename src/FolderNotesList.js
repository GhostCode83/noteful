import React from 'react'
import Note from './Note'

function FolderNotesList(props) {
  console.log(props, 'folderId')
    const notesList = props.notes.filter(note => {
      if (note.folderId === props.match.params.folderId) {
        return note
      }
    })
    
  return <div>{notesList.map(note => {
    let noteId = note.id;
    let noteName = note.name;
    let noteDate = note.modified
      return (
        <Note
          noteId={noteId}
          name={noteName}
          date={noteDate}
        />
      )
  })}</div>
}

export default FolderNotesList