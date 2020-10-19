import React from 'react'
import './NotefulForm.css'
import Proptypes from 'prop-types'

class NotefulForm extends React.Component {
  render(){
  const { className, ...otherProps } = this.props

  return (
    <form
      className={['Noteful-form', className].join(' ')} 
      action='#'
      {...otherProps}
    />
  )
  }
}

export default NotefulForm

NotefulForm.Proptypes = {
  onSubmit: Proptypes.func.isRequired
}