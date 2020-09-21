import React from 'react';
import NotefulContext from './NotefulContext'
import config from './config'
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import NotesList from './NotesList';

class NotesPage extends React.Component {

  
  static contextType = NotefulContext;

  handleDeleteNote(note, callback){
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
    .then(() => {
      this.props.history.push('/')
      callback(note.id)
    })
    .catch(error => {
      console.error(error)
    })
  }
  
  render() {
    console.log(this.props)
    const oneNote = (this.props.match ) ? this.context.notes.find(note => {
      if (note.id === this.props.match.params.notesId) {
        return (note)
      }
    }) : ''
//try rendering another compenent to remove the extra delete button
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

NotesList.defaultProps ={
  
}
NotesPage.propTypes ={
  history: PropTypes.shape({
    push: PropTypes.func,
    length: PropTypes.number
  }),
  location: PropTypes.object,
  notes: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.string,
    folderId: PropTypes.string.isRequired,
    id: PropTypes.string,
    modified: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }))
}

export default withRouter(NotesPage)