import React, { useState } from 'react'
import Response from './../Response/Response';
import './Ai.css'

export function Ai () {
    const [input, setInput] = useState('')
    const [prompt, setPrompt] = useState([])
    const [response, setResponse] = useState([])

    const getResponse = async() => {
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
    }

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    return (
        <div>
            <h1 className='App-title'>Fun with AI</h1>

            <p className='prompt-title'>Enter prompt</p>
            <form className='prompt'>
                <input 
                    type="text" 
                    id="prompt" 
                    name="prompt" 
                    size="50" 
                    value={input}
                    onChange={e => handleChange(e)}
                />
            </form>
            <input type="submit" value="Submit" className="prompt-button" onClick={getResponse} />
            <h2>Responses</h2>
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
