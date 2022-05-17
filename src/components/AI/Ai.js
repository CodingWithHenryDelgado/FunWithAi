import React, { useState } from 'react'
import Response from './../Response/Response';
import './Ai.css'
const API_KEY = `${process.env.REACT_APP_API_KEY}`;

export function Ai () {
    const [input, setInput] = useState('')
    const [prompt, setPrompt] = useState([])
    const [response, setResponse] = useState([])
    const [loading, setLoading] = useState(false)

    const getResponse = async() => {
        setLoading(true)
        setInput('')
        await fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
        method: "POST",
        headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            "prompt": `${input}`,
            "temperature": 0,
            "max_tokens": 38
        })
        })
        .then(response => response.json())
        .then(setPrompt(state => [...state, input]))
        .then(data => setResponse(state => [...state, data.choices[0].text]))
        setLoading(false)
        window.sessionStorage.setItem('prompt', prompt)
        window.sessionStorage.setItem('response', response)
    }

    const handleChange = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }

    return (
        <div>
            <h1 className='App-title'>Fun with AI</h1>

            <p className='prompt-title'><i>Enter prompt</i></p>
                <textarea 
                    type="text" 
                    id="prompt" 
                    name="prompt"
                    placeholder='Say this is a test'
                    value={input}
                    onChange={e => handleChange(e)}
                />
            <input type="submit" value="Submit" className="prompt-button" onClick={getResponse} />
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
