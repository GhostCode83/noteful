import React from 'react';
import { NavLink, withRouter } from 'react-router-dom'

function NavBar(props) {
  const contents = props.folders.map((folder, ind) => {
    let folderName = folder.name;
    let folderId = folder.id;

    //link should not have colon, only in the route component

    return (
      <NavLink key={ind} to={`/folder/${folderId}`}>
        <h3 >{folderName}</h3>
      </NavLink>
    )
  })

  return (
    <div>
      {contents}
      <button>Add Folder</button>
      <button onClick={() => props.history.push('/')}>Go Back</button>
    </div>
  )
}

/*
*/

export default withRouter(NavBar)