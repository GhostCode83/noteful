import React from 'react';
import { Route, Link } from 'react-router-dom';
import NotesList from './NotesList';
import FolderNotesList from './FolderNotesList';
import MinutesPage from './MinutesPage';
import NavBar from './NavBar'
import STORE from './dummy-store'
import NotefulContext from './NotefulContext';

class App extends React.Component {
  render() {
    const contextValue = {
      notes: STORE.notes,
      folders: STORE.folders,
      deleteBookmark: () => { }
    }

    return (
      <NotefulContext.Provider value={contextValue}>
        <div className="App">
          <nav>
            <NavBar
              folders={STORE.folders}
              notes={STORE.notes}
            />
          </nav>
          <header>
            <h1><Link to='/'>Noteful</Link></h1>
          </header>
          <main>
            <Route
              exact
              path='/'
              component={NotesList}
            />
            <Route
              path='/folder/:folderId' // use : here in path only
              component={FolderNotesList}
            />
            <Route
              path='/note/:notesId'
              component={MinutesPage}
            />
          </main>
        </div>
      </NotefulContext.Provider>
    );
  }
}


/*        
         
*/
export default App;


