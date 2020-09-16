import React from 'react';
import Note from './Note';
import NotefulContext from './NotefulContext'

class MinutesPage extends React.Component {
  static contextType = NotefulContext;


  render() {
    console.log(this.context)
    const oneNote = this.context.notes.find(note => {
      if (note.id === this.context.match.params.notesId) {
        return note
      }
    })

    return (
      <article>
        <div>
          <h3>{oneNote.name}</h3>
          <p>{oneNote.modified}</p>
          <button>Delete Note</button>
        </div>
        <p>{oneNote.content}</p>
      </article>
    )
  }
}
/* 
 */
export default MinutesPage