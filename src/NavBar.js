import React from 'react';
import { NavLink } from 'react-router-dom'

function NavBar(props) {
  const contents = props.folders.map((folder, ind) => {
    let folderName = folder.name;
    let folderId = folder.id;
    return (
    <NavLink to={`/folder/:${folderId}`}>
      <h3 id={ind}>{folderName}</h3>
    </NavLink>
    )
  })
  
  return (
      <div>
        {contents}
        <button>Add Folder</button>
        <button>Go Back</button>
      </div>
  )
}

export default NavBar