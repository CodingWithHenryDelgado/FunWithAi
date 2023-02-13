import React, { useState, useEffect, useRef } from 'react'
import './Ai.css'
import InputArea from '../InputArea/InputArea';
import Loading from './../Loading/Loading';
import Chat from './../Chat/Chat';
const API_KEY = `${process.env.REACT_APP_API_KEY}`;
const API_KEY_2 = `${process.env.REACT_APP_API_KEY_2}`

export function Ai() {
    const [input, setInput] = useState('')
    //This is for the user question and the AI response.
    const [prompt, setPrompt] = useState([])
    //Waiting for the AI to response will show a bubble writing animation
    const [loading, setLoading] = useState(false)
    //Will be used to keep track of the chat height value
    const chatContainerRef = useRef(null);

    //Everytime the prompt state changes this will push it to the latest message
    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [prompt]);

    const getResponse = async () => {
        setLoading(true)
        setInput('')
        //Users question is pushed into the prompt state
        setPrompt(state => [...state, input])
        //Fetch response from AI
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
            //We received AI response and set it in the state.
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
            <InputArea
                input={input}
                handleChange={handleChange}
                handleKeyChange={handleKeyChange}
                getResponse={getResponse}
            />
        </div >
    )
}
