import React from 'react';
import { Link } from 'react-router-dom'

function Note(props){
  
  return(
    <li>
      <Link to={`/note/${props.noteId}`}>
        <h2>{props.name}</h2>
        <p>{props.date}</p>
      </Link>
      </li>

  )
}

export default Note