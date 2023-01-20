import React from 'react'
import './Response.css'

const Response = (props) => {
  return (
    <>
      {props.response.map((r) => (
        <div className='response-box' key={r + " responded " + 2}>
          <p>{r}</p>
        </div>
      ))}
    </>
  )
}

export default Response