import React from 'react';
import { NavLink, withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NavBar.css'

function NavBar(props) {
  const contents = props.folders.map((folder, ind) => {
    let folderName = folder.name;
    let folderId = folder.id;

    return (
      <NavLink key={ind} to={`/folder/${folderId}`}>
        <h2 >{folderName}</h2>
      </NavLink>
    )
  })

  return (
    <div className='left-menu'>
      {contents}
      <Link to={`/AddFolder`}>
        <button >Add Folder</button>
      </Link>
      <button onClick={() => props.history.push('/')}>Go Back</button>
    </div>
  )
}


NavBar.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.object)
}
export default withRouter(NavBar)