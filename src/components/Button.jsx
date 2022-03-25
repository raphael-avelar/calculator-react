import React from 'react'
import './Button.css'

export default (props) => {
  const { kind, label } = props

  return (
    <button
      className={'button ' + kind}
      {...props}
    >
      {label}
    </button>
  )
}