import React, { useState } from 'react'
import './../Response/Response.css'
import Response from './../Response/Response';
import Prompt from './../Prompt/Prompt';
import './Ai.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loading from './../Loading/Loading';
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
        setPrompt(state => [...state, input])
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
        <div className='chat'>
            <div className='response-div'>
                <Prompt
                    prompt={prompt}
                    key={prompt}
                />
                <Loading
                    loading={loading}
                />
                <Response
                    response={response}
                    key={response}
                />
            </div>
            <div className='prompt-area'>
                <textarea
                    type="text"
                    id="prompt"
                    name="prompt"
                    placeholder='Talk with AI.'
                    value={input}
                    onChange={e => handleChange(e)}
                    onKeyDown={e => handleKeyChange(e)}
                />
                <input type="submit" value={<FontAwesomeIcon icon={["fa-sharp", "fa-solid", "fa-arrow-turn-down-left"]} />} id="prompt-button" onClick={getResponse} />
            </div>
        </div>
    )
}
