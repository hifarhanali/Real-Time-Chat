import React, {useState, useEffect} from 'react';
import axiosAPI from 'axios'
import path from 'path'

import './contact.css'


const Contact = ({conversation, loginUser}) => {
    const axios = axiosAPI.create({
        baseURL: "http://localhost:5000"
    });


    // to get detail of conversation user
    const [conversationUser, setConversationUser] = useState(null);
    useEffect(() => {
        const getConversationUserDetail = async () => {
            const contactId = conversation.members.find(m => m !== loginUser._id);
            try {
                const res = await axios.get('/user/' + contactId);
                setConversationUser(res.data);
            }
            catch (error) {
                console.log(error);
            }
        }
        getConversationUserDetail();
    }, [conversation, loginUser]);

    
    return (        
        <div className='contact-container'>
            <div className='user-profile-photo-container'>
                <img className='user-profile-photo' src={path.join(__dirname, conversationUser? conversationUser.photo : "" )} alt='contact-profile'/>
            </div>
            <div className='user-name-container'>
                <h3>{conversationUser?.firstName + " " + conversationUser?.lastName}</h3>
                <span className="last-message-text">Hello, I am doing good....</span>
            </div>
            <div className='last-message-time-container'>
                <span className='last-message-time'>05:46</span>
            </div>
        </div>
    );
}

export default Contact;