import React, { useState, useEffect, useRef} from 'react';
import axiosAPI from 'axios';
import path from 'path';
import {io} from 'socket.io-client';


import ContactList from './contactList/contactList';
import ChatWindow from './chatWindow/chatWindow';

// import font awsome for icons
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

// import style sheets
import './chat.css';

// avatar image url
const AVATAR_IMG_URL = "images/user_images/avatar.jpg";

const Chat = ({loginUser}) => {

  const axios = axiosAPI.create({
    baseURL: "http://localhost:5000"
  })

  const [isProfileSideBarOpen, setIsProfileSideBarOpen] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const socket = useRef();
  const SOCKET_PORT = 8990;

  // to get detail of conversation user
  const [conversationUser, setConversationUser] = useState(null);
  useEffect(() => {
    const getConversationUserDetail = async () => {
      const contactId = currentChat?.members?.find(m => m !== loginUser._id);
      try {
        const res = contactId && await axios.get('/user?userId=' + contactId);
        res && setConversationUser(res.data);
      }
      catch (error) {
        console.log(error);
      }
    }
    getConversationUserDetail();
  }, [currentChat, loginUser]);



  useEffect(() => {
    socket.current = io(`ws://localhost:${SOCKET_PORT}`);
  }, [])


  // recieve message from socket server side
  useEffect(() => {

    // add the login user
    socket.current.emit("addUser", loginUser?._id);

    // get all online users from server side
    socket.current.on("getAllOnlineUsers", onlineUsers => {
      console.log(onlineUsers);      
    })
  }, [loginUser]);



  // to get all conversations of a specific user
  useEffect(() => {
    const getUserConversations = async () => {
      try {
        const res = await axios.get('/conversation/' + loginUser._id);
        setConversations(res.data);
      }
      catch (error) {
        console.log(error);
      }
    }
    loginUser && getUserConversations();
  }, [loginUser]);


  // to get all messages of two specific users
  useEffect(() => {
    const getUsersMessages = async () => {
      try {
        const res = await axios.get('/message/' + currentChat?._id);
        res?.data?.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : -1)
        setMessages(res.data);
      }
      catch (error) {
        console.log(error);
      }
    }
    getUsersMessages();
  }, [currentChat]);



  return (
    <div className="chat-container" style={{ display: "flex", height: "100vh" }}>
      <div className="user-contacts-container" style={{ width: "25%" }}>
        <div className='chat-heading-container'>
          <div className='back-btn-container'>
            <i class="fa fa-angle-left"></i>
          </div>
          <h3>Chat</h3>
        </div>
        <div className='search-contact-container'>
          <input className='search-contact' type='text' placeholder='Search contact . . .' />
          <i className='fa fa-search'></i>
        </div>
        <ContactList setCurrentChat={setCurrentChat} conversationList={conversations} loginUser={loginUser} />
      </div>

      <div className="user-chat-window-container profileSideBarCloseStyleChatWindow">
        {
          currentChat
            ? <ChatWindow conversationUser={conversationUser} socket={socket} messages={messages} setMessages={setMessages} loginUser={loginUser} currentChat={currentChat} setCurrentChat={setCurrentChat} />
            : <div className='no-chat-message-container'> <span>Open a chat to start conversation</span></div>
        }
      </div>

      {
        currentChat &&
        <div className={`${!isProfileSideBarOpen? "profileSideBarCloseStyle": ""} current-chat-user-detail-container`} style={{ width: "25%" }}>
          <div className='chat-heading-container'>
            <div className='back-btn-container' onClick={() => setIsProfileSideBarOpen(!isProfileSideBarOpen)}>
              <i class={`fa fa-angle-${isProfileSideBarOpen? "right": "left"}`}></i>
            </div>
            <h3>User Profile</h3>
          </div>
          <div className='current-chat-user-detail'>
            <img
            className='current-chat-user-profile-photo'
            src={path.join(__dirname, conversationUser? conversationUser.photo? conversationUser.photo : AVATAR_IMG_URL : AVATAR_IMG_URL)}
            alt='contact-profile' />
            <h2 className='current-chat-user-name'>{conversationUser?.firstName + " " + conversationUser?.lastName}</h2>
            <p>{"@" + conversationUser?.username}</p>
          </div>
        </div>
      }

    </div>
  );
}

export default Chat;
