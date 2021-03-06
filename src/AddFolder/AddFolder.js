import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddFolder.css'
import PropTypes from 'prop-types'

export default class AddFolder extends Component {
  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;
  state = {
    name: '',
    message: 'Name is required for folder. Validation Failed.',
    isError: false
  }

  handleNameChange = e => {
    this.setState({name: e.currentTarget.value});
    this.setState({message: ''});
  }

  handleSubmit = e => {
    e.preventDefault()
    let nameError = this.validateName();
    if (nameError){
      console.log(nameError);
      return 
    }
    const folder = {
      //name: e.target['folder-name'].value
      name: this.state.name
    }
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  validateName(){
    if(!this.state.name) {
      this.setState({isError:true})
      this.setState({message: 'Name is required for folder. Validation Failed.'});
      return new Error(`Name is required for folder. Validation Failed`);
    }
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input value={this.state.name} onChange={this.handleNameChange} type='text' id='folder-name-input' name='folder-name' />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
          {this.state.isError && <h1>{this.state.message}</h1>}
        </NotefulForm>
      </section>
    )
  }
}

AddFolder.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}