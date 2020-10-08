import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'


export default class AddNote extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  state = {
    name: '',
    nameMessage: 'Name is required for note. Validation Failed.',
    contentMessage: 'Content is required for note. Validation Failed.',
    isNameError: false,
    isContentError: false,
    content: ''
  }

  handleNameChange = e => {
    this.setState({name: e.currentTarget.value});
  }

  handleContentChange = e => {
    this.setState({content: e.currentTarget.value});
  }

  handleSubmit = e => {

    e.preventDefault()
    let nameError = this.validateName();
    let contentError = this.validateContent();
    if (nameError){
      console.log(nameError);
      return 
    }
    if (contentError){
      console.log(contentError);
      return 
    }
    
    const newNote = {
      name: this.state.name,
      //name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folderId: e.target['note-folder-id'].value,
      modified: new Date(),
    }
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  validateName(){
    if(!this.state.name) {
      this.setState({isError:true})
      return new Error(`Name is required for folder. Validation Failed`);
    }
  }

  validateContent(){
    if(!this.state.content) {
      this.setState({isError:true})
      return new Error(`Content is required for folder. Validation Failed`);
    }
  }
  render() {
    const { folders=[] } = this.context
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>

        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' value={this.state.name} onChange={this.handleNameChange} id='note-name-input' name='note-name' />
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' value={this.state.content} onChange={this.handleContentChange} name='note-content' />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' name='note-folder-id'>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add note
            </button>
          </div>
          {this.state.isError && <h2>{this.state.nameMessage}</h2>}
          {this.state.isError && <h2>{this.state.contentMessage}</h2>}
        </NotefulForm>
    
      </section>
    )
  }
}
