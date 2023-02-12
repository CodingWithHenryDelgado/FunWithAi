import React, { useState, useEffect, useRef } from 'react'
import './Ai.css'
import Loading from './../Loading/Loading';
import Chat from './../Chat/Chat';
const API_KEY = `${process.env.REACT_APP_API_KEY}`;
const API_KEY_2 = `${process.env.REACT_APP_API_KEY_2}`

export function Ai() {
    const [input, setInput] = useState('')
    const [prompt, setPrompt] = useState([])
    const [loading, setLoading] = useState(false)
    const chatContainerRef = useRef(null);

    useEffect(() => {
        window.requestAnimationFrame(() => {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        });
    }, [prompt]);

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
            .then(data => setPrompt(state => [...state, data.choices[0].text]))
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
            <ul className='response-div' ref={chatContainerRef}>
                <Chat
                    chat={prompt}
                    key={prompt}
                />
                <Loading
                    loading={loading}
                />
            </ul>
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
                <input type="submit" value="←" id="prompt-button" onClick={getResponse} />
            </div>
        </div >
    )
}
