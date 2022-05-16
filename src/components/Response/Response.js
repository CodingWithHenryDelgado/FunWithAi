import React from 'react'
import './Response.css'

const Response = (props) => {
  return (
    <div className='response-div'>
      <div className='prompt-box'>
        <h2>Prompt:</h2>
        <p>{props.prompt}</p>
      </div>
      <div className='response-box'>
        <h2>Response:</h2>
        <p>{props.response}</p>
      </div>
    </div>
  )
}

export default Response