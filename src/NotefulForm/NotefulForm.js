import React from 'react'
import './NotefulForm.css'

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