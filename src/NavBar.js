import React from 'react';
import { NavLink, withRouter, Link } from 'react-router-dom'

function NavBar(props) {
  const contents = props.folders.map((folder, ind) => {
    let folderName = folder.name;
    let folderId = folder.id;

    return (
      <NavLink key={ind} to={`/folder/${folderId}`}>
        <h3 >{folderName}</h3>
      </NavLink>
    )
  })

  return (
    <div>
      {contents}
      <Link to={`/AddFolder`}>
        <button >Add Folder</button>
      </Link>
      <button onClick={() => props.history.push('/')}>Go Back</button>
    </div>
  )
}

/*
*/

export default withRouter(NavBar)