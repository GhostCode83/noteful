import React from 'react';
import { Route, Link } from 'react-router-dom';
import NotesList from './NotesList';
import FolderNotesList from './FolderNotesList';
import NotesPage from './NotesPage';
import NavBar from './NavBar'
import NotefulContext from './NotefulContext';
import config from './config'
import { withRouter } from 'react-router-dom'
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import NotefulError from './NotefulError';

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
    
  addFolder = (newFolder) => {
    const newFolders = [...this.state.folders, newFolder]
      this.setState({
        folders: newFolders
      })
    }
      
  addNote = (newNote) => {
    const newNotes = [...this.state.notes, newNote]
    this.setState({
      notes: newNotes,
    
    })
  }
  
  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}notes/`),
      fetch(`${config.API_ENDPOINT}folders/`)
    ])
      .then(([res1, res2]) =>
        Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        this.setState({
          notes: data1,
          folders: data2
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote, 
      addFolder: this.addFolder,
      addNote: this.addNote
    }


    return (
      <NotefulContext.Provider value={contextValue}>
        <div className="App">
          <nav>
            <NotefulError>
              <NavBar
                folders={this.state.folders}
              />
            </NotefulError>
          
          </nav>
          <header>
            <h1><Link to='/'>Noteful</Link></h1>
          </header>
          <main>
            <NotefulError>
              <Route
                exact
                path='/'
                component={NotesList}
              />
            </NotefulError>
            <NotefulError>
              <Route
                path='/folder/:folderId' // use : here in path only
                component={(props) =>
                  <FolderNotesList
                    notes={this.state.notes}
                    {...props}
                  />}
              />
            </NotefulError>
            <NotefulError>
            <Route
              path='/note/:notesId'
              children={({match}) => (
                <NotesPage
                match={match}
                notes={this.state.notes}
                />
                )}
                />
            </NotefulError>
            <NotefulError>
              <Route
                path='/AddFolder'
                component={(props) => 
                  <AddFolder 
                  {...props}
                  folders={this.state.folders}
                  />
                }
                />
            </NotefulError>
            <NotefulError>
              <Route
                path='/AddNote'
                component={(props) =>
                  <AddNote 
                    {...props}
                    folders={this.state.folders}
                  />
                }
              />
            </NotefulError>
          </main>
        </div>
        
      </NotefulContext.Provider>
    );
  }
}


export default withRouter(App);