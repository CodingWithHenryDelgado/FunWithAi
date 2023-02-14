import React from 'react'
import './Chat.css'
import ROBOT from '../../images/robot-icon.png';

const Chat = (props) => {
    const COLORS = [
        "chat-blue",
        "chat-gray"
    ];

    const ICONS = [
        "none",
        "block"
    ]

    //The AI response's are in blue
    const getChatColor = (index) => COLORS[index % 2];
    const getChatIcon = (index) => ICONS[index % 2];

    return (
        <>
            {props.chat.map((p, index) => (
                <div className='new-chat-line'>
                    <img className="chat-icon" src={ROBOT} key={'Picture' + index} alt="Robot Icon" style={{ display: getChatIcon(index) }} />
                    <li className={`chat-box ${getChatColor(index)}`} key={index}>
                        {p}
                    </li>
                </div>
            ))}
        </>
    )
}

export default Chat