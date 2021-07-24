import {format} from 'timeago.js'

import './message.css'


const Message = ({message, own}) => {
    return (
        <div className={`message-container ${own? 'own' : ''}`} >
            <p className='message-text'>{message.text}</p>
            <span className='message-time'>{format(message.createdAt)}</span>
        </div>
    );
}

export default Message;