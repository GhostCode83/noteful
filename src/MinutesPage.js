import React from 'react';
import Note from './Note';
import NotefulContext from './NotefulContext'
import config from './config'
import {withRouter} from 'react-router-dom'



class MinutesPage extends React.Component {
  constructor(props) {
    super(props)
  }

  static contextType = NotefulContext;
  
  handleDeleteNote(note, callback){
    console.log(note, 'hello')
    fetch(`${config.API_ENDPOINT}notes/${note.id}`, {
      method: 'DELETE',
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        console.log(data);
        this.props.history.push('/')
        callback(note.id)
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    console.log(this.props.match, this.context, 'yellow')
    const oneNote = (this.props.match ) ? this.context.notes.find(note => {
      if (note.id === this.props.match.params.notesId) {
        return (note)
      }
    }) : ''

    return (
      <NotefulContext.Consumer>
        {(context) => (
          <article>
            <div>
              <h3>{oneNote.name}</h3>
              <p>{oneNote.modified}</p>
              <button onClick={() =>
                this.handleDeleteNote(
                  oneNote,
                  context.deleteNote
                )
              }>
                Delete Note
        </button>
            </div>
            <p>{oneNote.content}</p>
          </article>
        )}
      </NotefulContext.Consumer>
    )
  }
}
/* function handleDeleteNote(noteId, callback){
  console.log(noteId)
  fetch(`${config.API_ENDPOINT}notes/${noteId}`, {
    method: 'DELETE',
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      return res.json()
    })
    .then(data => {
      console.log(data);
      callback(noteId)
    })
    .catch(error => {
      console.error(error)
    })
}

function Note(props){
  console.log(props.noteId)
  return(
    <NotefulContext.Consumer>
      {(context) => (

<li key={props.noteId}>
      <Link to={`/note/${props.noteId}`}>
        <h2>{props.name}</h2>
        <p>{props.date}</p>
        </Link>
        <button onClick={() => 
          handleDeleteNote(
            props.noteId, 
            context.deleteNote
          )
        }>
          Delete Note
        </button>
      </li>

      )}
    </NotefulContext.Consumer>
  )
}
 */
export default withRouter(MinutesPage)