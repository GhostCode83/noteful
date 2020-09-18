import React from 'react';

class AddNote extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name: {
        value: ''
      },
      content: {
        value: ''
      },
      folder: {
        value: ''
      }
    }
  }

  render(){
    return(
      <form>
        <label>
          Name: 
        </label>
        <input />
      </form>
    )
  }

}