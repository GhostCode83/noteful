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
              component={() => 
                <FolderNotesList 
                notes={STORE.notes}
                folders={STORE.folders}
                match={this.context.match}
                />}
                />
            <Route
              path='/note/:notesId'
              component={() => 
                <MinutesPage
                notes={STORE.notes}
                match={this.context.match}
                />
              }
              />
          </main>
        </div>
      </NotefulContext.Provider>
    );
  }
}


/*              <Route
              exact
              path='/'
              render={() => <NotesList notes={STORE.notes} />}
            />
            <Route
              path='/folder/:folderId' // use : here in path only
              render={(props) =>
                <FolderNotesList
                  notes={STORE.notes}
                  folders={STORE.folders}
                  match={props.match} />}
            />
            <Route
              path='/note/:notesId'
              render={(props) =>
                <MinutesPage
                  notes={STORE.notes}
                  match={props.match}
                />}

                
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
   
*/
export default App;


