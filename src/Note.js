import React from 'react';
import { Link } from 'react-router-dom';
import config from './config';
import NotefulContext from './NotefulContext';

function deleteNote(noteId, callback){
  fetch(config.API_NOTES)
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

  return(
    <NotefulContext.Consumer>
      {(context) => (

<li key={props.noteId}>
      <Link to={`/note/${props.noteId}`}>
        <h2>{props.name}</h2>
        <p>{props.date}</p>
        <button onClick={() => deleteNote}>Delete Note</button>
      </Link>
      </li>


      )}
    </NotefulContext.Consumer>
    
  )
}

export default Note