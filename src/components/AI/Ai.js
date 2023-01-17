import React, { useState } from 'react'
import Response from './../Response/Response';
import './Ai.css'
const API_KEY = `${process.env.REACT_APP_API_KEY}`;
const API_KEY_2 = `${process.env.REACT_APP_API_KEY_2}`

export function Ai() {
    const [input, setInput] = useState('')
    const [prompt, setPrompt] = useState([])
    const [response, setResponse] = useState([])
    const [loading, setLoading] = useState(false)

    const getResponse = async () => {
        setLoading(true)
        setInput('')
        await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}${API_KEY_2}`,
            },
            body: JSON.stringify({
                "prompt": `${input}`,
                "temperature": 0,
                "max_tokens": 92
            })
        })
            .then(response => response.json())
            .then(setPrompt(state => [...state, input]))
            .then(data => setResponse(state => [...state, data.choices[0].text]))
        setLoading(false)
    }

    const handleChange = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }

    const handleKeyChange = (e) => {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault()
            setInput(e.target.value)
            getResponse();
        }
    }

    return (
        <div>
            <p className='prompt-title'><i>Enter prompt</i></p>
            <div className='prompt-area'>
                <textarea
                    type="text"
                    id="prompt"
                    name="prompt"
                    placeholder='Say this is a test'
                    value={input}
                    onChange={e => handleChange(e)}
                    onKeyDown={e => handleKeyChange(e)}
                />
                <input type="submit" value="Submit" className="prompt-button" onClick={getResponse} />
            </div>
            <h2 className='response-title'>Responses</h2>
            {loading ? <div id='loading'><p>Loading....</p></div> : <></>}
            {response.map((r, id) => (
                <Response
                    prompt={prompt[id]}
                    response={r}
                    key={id}
                />
            )).reverse()}
        </div>
    )
}
