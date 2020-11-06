import React from 'react';
import { Link } from 'react-router-dom';
import config from './config';
import NotefulContext from './NotefulContext';

function handleDeleteNote(noteId, callback) {
  fetch(`${config.API_ENDPOINT}notes/${noteId}`, {
    method: 'DELETE',
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(error => {
          throw error
        })
      }
      return res
    })
    .then(data => {
      callback(noteId)
    })
    .catch(error => {
      console.error(error)
    })
}

function Note(props) {
  return (
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

export default Note