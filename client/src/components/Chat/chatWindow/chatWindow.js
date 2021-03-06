import { useState, useEffect } from 'react';
import MessageList from './messageList/messageList';
import ProfileBar from './profileBar/profileBar';
import axiosAPI from 'axios'


// import style sheets
import './chatWindow.css'


const ChatWindow = ({ socket, currentChat, messages, setMessages, loginUser, conversationUser, setCurrentChat, conversations, setConversations, isCurrentUserOnline, setIsCurrentUserOnline }) => {

    const axios = axiosAPI.create({
        baseURL: "http://localhost:5000"
    })

    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);  // new message recieve using socket

    // send message and save in the database
    const handleMessageSubmit = async (e) => {
        e.preventDefault();

        if (newMessage.trim()) {
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
                // save message in the database
                const res = await axios.post('/message', message);

                if (res.status === 200) {
                    const conversationId = currentChat?._id;

                    // update conversation last message time
                    const conversationUpdateResponse = await axios.put("/conversation?conversationId=" + conversationId);
                    if (conversationUpdateResponse.status === 200) 
                    {
                        let tempConversations = (
                            conversations.map(conversation => 
                                conversation._id === conversationId 
                                ? {...conversation, lastMessageAt : conversationUpdateResponse.data?.lastMessageAt} 
                                : conversation
                        ));

                        // set conversations in sorted order
                        setConversations(tempConversations.sort((a, b) => {
                            if (!a.lastMessageAt) return -1;
                            if (!b.lastMessageAt) return 1;
                            if (a.lastMessageAt == b.lastMessageAt) return 0
                            return a.lastMessageAt > b.lastMessageAt ? -1 : 1;
                        }));

                        setMessages([...messages, res.data]);
                        setNewMessage("");
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    // if there is any change in arrival message i.e we have reieved a new message,
    // update messages list
    useEffect(() => {
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
    }, []);

    // send message if enter key is pressed
    const handleKeyPress = (e) => {
        if (e.which == 13) {
            e.preventDefault();
            document.getElementById("message-submit-btn")?.click();
        }
    }

    return (
        <div className="chat-window-container">
            <ProfileBar 
                conversationUser={conversationUser}
                setCurrentChat={setCurrentChat}
                isCurrentUserOnline={isCurrentUserOnline}
                setIsCurrentUserOnline={setIsCurrentUserOnline}
            />
            <MessageList messages={messages} setMessages={setMessages} loginUser={loginUser} />
            <div className='message-input-container'>
                <input
                    type='text'
                    id='message-input'
                    placeholder='Type here . . .'
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e)}
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
