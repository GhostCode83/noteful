import React from 'react';
import { Route, Link } from 'react-router-dom';
import NotesList from './NotesList';
import FolderNotesList from './FolderNotesList';
import MinutesPage from './MinutesPage';
import NavBar from './NavBar'
import STORE from './dummy-store'

class App extends React.Component {
  render() {

    return (
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
            render={() => <NotesList notes={STORE.notes} />}
          />
          <Route
            component={(props) => {
              console.log(props.match.params)
              return <div />
            }}
          />
          <Route
            path='/folder/:folderId'
            render={(props) =>
              <FolderNotesList
                notes={STORE.notes}
                folders={STORE.folders}
                match={props.match} />}
          />
          <Route
            path='/note/:notesId'
            component={MinutesPage}
          />
        </main>
      </div>
    );
  }
}


/*        
         
*/
export default App;


