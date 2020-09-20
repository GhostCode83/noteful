import  React from  'react';
import ValidationError from './ValidationError';
import config from './config'
import NotefulContext from './NotefulContext';

class AddFolder extends  React.Component{
  constructor(props){
    super(props)
    this.state = {
      folder: {
        value: '',
        touch: false
      }
    }
  }

  updateFolder(folder){
    this.setState({folder: {value: folder, touch: true}})
  }

  handleSubmit(event, callback){
    event.preventDefault();
    const { folder } = this.state;
    console.log("Folder Title: ", folder.value)
    fetch(`${config.API_ENDPOINT}folders/`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({name: folder.value}),
    })
      .then(res => {
        if(!res.ok) {
          return res.json().then(error => {
            throw error
          })
        }
        return res.json()
      })
      .then(data => {
        console.log(data);
        callback()
      })//not doing anything with the data yet
      .catch(error => {
        console.error(error)
      })
  }

  homePage(){

  }
  validateFolder(){
    const folder = this.state.folder.value.trim();
    if (folder.length === 0) {
      return 'Folder title is required';
    } else if (folder.length < 3) {
      return 'Folder title must be at least 3 characters long';
    }
  }

  render() {
    console.log(this.props, )
    return(
      <NotefulContext.Consumer>
      {(context) => (
        <form onSubmit={event => 
          this.handleSubmit(
            event,
            context)}>
        <h2> Add Folder</h2>
        <label htmlFor='folder'>
          Folder Title:
        </label>
        <input id='folder' type='text' onChange={e => this.updateFolder(e.target.value)} /> 
        {this.state.folder.touch && (<ValidationError message={this.validateFolder()}/>)}
        
        <button 
        type='submit'
        className='folder__button'
        disabled={
          this.validateFolder()
        }
        >Submit Folder</button>
        <button type='reset'>Cancel</button>
        </form>
        
      )}
        </NotefulContext.Consumer>
       
    )
  }
}

/*   <NotefulContext.Consumer>
      {(context) => {
        <form onSubmit={event => 
          this.handleSubmit(
            event)}>
        <h2> Add Folder</h2>
        <label htmlFor='folder'>
          Folder Title:
        </label>
        <input id='folder' type='text' onChange={e => this.updateFolder(e.target.value)} /> 
        {this.state.folder.touch && (<ValidationError message={this.validateFolder()}/>)}
        
        <button 
        type='submit'
        className='folder__button'
        disabled={
          this.validateFolder()
        }
        >Submit Folder</button>
        <button type='reset'>Cancel</button>
        </form>
        console.log(context)
      }}
        </NotefulContext.Consumer>


        {this.state.folder.touched && (<ValidationError message={this.validateFolder()}/>)}
*/
export default AddFolder