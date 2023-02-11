import React from 'react'
import './Chat.css'

const Chat = (props) => {
    const COLORS = [
        "chat-blue",
        "chat-gray"
    ];

    const getChatColor = (index) => COLORS[index % 2];

    return (
        <>
            {props.chat.map((p, index) => (
                <li className={`chat-box ${getChatColor(index)}`} key={p + " sent " + 2}>
                    {p}
                </li>
            ))}
        </>
    )
}

export default Chat