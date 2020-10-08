import React from 'react'
import './NotefulForm.css'
import propTypes from 'prop-types'

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

NotefulForm.propTypes = {
  /*
  value: (props, propName, componentName) => {
    // first get the value of the prop
    const prop = props[propName];

    // since we want to make this required let us check that first
    if(!prop) {
      return new Error(`${propName} is required in ${componentName}. Validation Failed`);
    }
  }
  */
  
};

export default NotefulForm
