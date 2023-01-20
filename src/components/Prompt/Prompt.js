import React from 'react'
import './Prompt.css'

const Prompt = (props) => {
    return (
        <>
            {props.prompt.map((p) => (
                <div className='prompt-box' key={p + " sent " + 2}>
                    <p>{p}</p>
                </div>
            ))}
        </>
    )
}

export default Prompt