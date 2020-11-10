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
import './App.css'

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
    console.log(newNotes)
    this.setState({
      notes: newNotes
    })
  }

  addFolder = (newFolder) => {
    console.log(newFolder, this.state.folders)
    let folder = {
      name: newFolder.title,
      id: newFolder.id
    }
    const newFolders = [...this.state.folders, folder]
    this.setState({
      folders: newFolders
    })
  }

  addNote = (newNote) => {
    //console.log(newNote, this.state.notes)
    let note = {
      id: newNote.id,
      name: newNote.note_name,
      folderId: newNote.folder,
      modified: newNote.date_posted
    }
    const newNotes = [...this.state.notes, note]
    this.setState({
      notes: newNotes,
    })
  }

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}notes/`),
      fetch(`${config.API_ENDPOINT}folders/`)
    ], {
      headers: {
        'content-type': 'application/json',
        'mode': 'cors',
        //'Authorization': `Bearer ${config.API_KEY}`,
        'Access-Control-Allow-Origin': '*'
      }
    }
    )
      .then(([res1, res2]) =>
        Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => {
        let folders = data2.map(item => {
          return {
            id: item.id,
            name: item.title
          };

        })
        let notes = data1.map(item => {
          return {
            id: item.id,
            name: item.note_name,
            modified: item.date_posted,
            folderId: item.folder,
            content: item.content
          }
        })
        this.setState({
          notes: notes,
          folders: folders
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    console.log(this.state.notes,)
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote
    }

    return (
      <NotefulContext.Provider value={contextValue}>

        <div>
          <header>
            <h1 className='heading'><Link to='/'>Noteful</Link></h1>
          </header>
          <div className="App">
            <nav>
              <NotefulError>
                <NavBar
                  folders={contextValue.folders}
                />
              </NotefulError>
            </nav>
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
                      notes={contextValue.notes}
                      {...props}
                    />
                  }
                />
              </NotefulError>
              <NotefulError>
                <Route
                  path='/note/:notesId'
                  children={({ match }) => (
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
                    />}
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
        </div>

      </NotefulContext.Provider>
    );
  }
}


export default withRouter(App);