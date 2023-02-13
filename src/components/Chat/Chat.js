import React from 'react'
import './Chat.css'

const Chat = (props) => {
    const COLORS = [
        "chat-blue",
        "chat-gray"
    ];

    //The AI response's are in blue
    const getChatColor = (index) => COLORS[index % 2];

    return (
        <>
            {props.chat.map((p, index) => (
                <li className={`chat-box ${getChatColor(index)}`} key={index}>
                    {p}
                </li>
            ))}
        </>
    )
}

export default Chat