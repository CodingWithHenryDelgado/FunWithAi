import React from 'react'
import './InputArea.css'

const InputArea = (props) => {
    return (
        <div className='prompt-area'>
            <textarea
                type="text"
                id="prompt"
                name="prompt"
                placeholder='Talk with AI.'
                value={props.input}
                onChange={props.handleChange}
                onKeyDown={props.handleKeyChange}
            />
            <input type="submit" value="←" id="prompt-button" onClick={props.getResponse} />
        </div>
    );
};

export default InputArea