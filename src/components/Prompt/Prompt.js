import React from 'react'
import '../Response/Response.css'

const Response = (props) => {
    return (
        <div className='prompt-box'>
            <h2>Prompt:</h2>
            <p>{props.prompt}</p>
        </div>
    )
}

export default Response