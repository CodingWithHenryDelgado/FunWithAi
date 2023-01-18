import React from 'react'
import './Response.css'

const Response = (props) => {
  return (
    <div className='response-box'>
      <h2>Response:</h2>
      <p>{props.response}</p>
    </div>
  )
}

export default Response