import React from 'react'
import Note from './Note'
import NotefulContext from './NotefulContext'

class FolderNotesList extends React.Component {
  constructor(props){
    super(props)
  }
  static contextType = NotefulContext;

  render(){
    console.log(this.context, 'folderId')
      const notesList = this.context.notes.filter(note => {
        if (note.folderId === this.props.match.params.folderId) {
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
}

export default FolderNotesList