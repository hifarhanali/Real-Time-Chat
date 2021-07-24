import { useEffect } from 'react';
import Message from './message/message';

const MessageList = ({ messages, setMessages, loginUser }) => {

    // to scroll chat window to recent/last messages
    useEffect(() => {
        var chatMessagesWrapper = document.querySelector('.chat-messages-wrapper');
        chatMessagesWrapper.scrollTop = chatMessagesWrapper.scrollHeight;
    }, [messages]);

    return (
        <div className='chat-messages-wrapper' style={{ display: 'block', padding: '15px 20px', height: '70vh', overflow: 'hidden', overflowY: 'scroll' }}>
            {
                messages.map(message =>(
                    <Message key={message._id} messages={messages} setMessages={setMessages} message={message} own={ message.senderId === loginUser?._id } />
                ))
            }
        </ div>
    );
}

export default MessageList;