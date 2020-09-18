import React from 'react';
import { Route, Link } from 'react-router-dom';
import NotesList from './NotesList';
import FolderNotesList from './FolderNotesList';
import MinutesPage from './MinutesPage';
import NavBar from './NavBar'
import NotefulContext from './NotefulContext';
import config from './config'
import { withRouter } from 'react-router-dom'
import AddFolder from './AddFolder';

class App extends React.Component {

  state = {
    notes: [],
    folders: []
  }

  static contextType = NotefulContext;

  deleteNote = noteId => {
    const newNotes = this.state.notes.filter(n =>
      n.id !== noteId
    )
    this.setState({
      notes: newNotes
    })
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}notes/`),
      fetch(`${config.API_ENDPOINT}folders/`)
    ])
      .then(([res1, res2]) =>
        Promise.all([res1.json(), res2.json()]))
      /* if (!res1.ok) {
         return res1.json().then(error => {
           throw error
         })
       }
       if (!res2.ok) {
         return res2.json().then(error => {
           throw error
         })
       }
       return ([res1.json(), res2.json()])
     }
      */
      .then(([data1, data2]) => {
        console.log(data1, data2)
        this.setState({
          notes: data1,
          folders: data2
        })
        console.log(data1, data2);
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    console.log(this.context)
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote
    }
    console.log(this.state.folders)
    return (
      <NotefulContext.Provider value={contextValue}>
        <div className="App">
          <nav>
            <NavBar
              folders={this.state.folders}
              notes={this.state.notes}
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
              component={(props) =>
                <FolderNotesList
                  notes={this.state.notes}
                  folders={this.state.folders}
                  {...props}
                />}
            />
            <Route
              path='/note/:notesId'
              children={({match}) => (
                <MinutesPage
                  match={match}
                  notes={this.state.notes}
                />
              )}
            />
            <Route
              path='/AddFolder'
              component={AddFolder}
            />
          </main>
        </div>
      </NotefulContext.Provider>
    );
  }
}


export default withRouter(App);