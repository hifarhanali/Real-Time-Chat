import { useState, useEffect} from 'react';
import MessageList from './messageList/messageList';
import ProfileBar from './profileBar/profileBar';
import axios from 'axios'


// import style sheets
import './chatWindow.css'


const ChatWindow = ({ socket, currentChat, messages, setMessages, loginUser}) => {
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);  // new message recieve using socket

    // send message and save in the database
    const handleMessageSubmit = async (e) => {
        e.preventDefault();

        const message = {
            conversationId: currentChat._id,
            senderId: loginUser._id,
            text: newMessage,
        };

        // send message to reciever using sockets
        socket.current.emit("sendMessage", {
            senderId: loginUser?._id,
            recieverId: currentChat?.members.find(member => member !== loginUser?._id),
            text: newMessage,
        })

        try {
            const res = await axios.post('/message', message);
            setMessages([...messages, res.data]);
            setNewMessage("");            
        }
        catch (error) {
            console.log(error);
        }
    }

    // if there is any change in arrival message i.e we have reieved a new message,
    // update messages list
    useEffect(() =>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.senderId) &&
        setMessages(prevMessages => [...prevMessages, arrivalMessage])
    }, [arrivalMessage, currentChat]);


    useEffect(() => {
        // recieve message
        socket.current.on("recieveMessage", msg => {
            setArrivalMessage({
                senderId: msg.senderId,
                text: msg.text,
                createdAt: new Date(),
            });
        });        
      }, [])
    

    return (
        <div className="chat-window-container">
            <ProfileBar />
            <MessageList messages={messages} loginUser={loginUser} />
            <div className='message-input-container'>
                <input
                    type='text'
                    id='message-input'
                    placeholder='Type here . . .'
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                />
                <button type='submit' id='message-submit-btn' onClick={handleMessageSubmit}>
                    <i class="fa fa-paper-plane"></i>
                </button>
            </div>
        </div>
    );
}

export default ChatWindow;
