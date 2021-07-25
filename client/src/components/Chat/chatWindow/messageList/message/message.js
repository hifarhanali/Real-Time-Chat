import axiosAPI from 'axios';
import { format } from 'timeago.js'

import './message.css'


const Message = ({ message, own, messages, setMessages }) => {

    const axios = axiosAPI.create({
        baseURL: "http://localhost:5000"
    })


    // display message menu
    const handleDisplayMessageMenuClick = (e) => {
        const messageId = e.target.id.split("_")[1];
        const element = document.querySelector(".message-menu-container_" + messageId);
        element.style.display = "block";
    }

    // to handle click event anywhere on screen
    // hide message menu, if open
    function addScreenClickEvent() {
        document.body.addEventListener('click', function () {;
            var message_menu_list = document.getElementsByClassName("message-menu-container");
            for (var i = 0; i < message_menu_list.length; ++i) {
                if (message_menu_list[i].style.display !== "none") {
                    message_menu_list[i].style.display = "none";
                }
            }
        }, true);
    }
    addScreenClickEvent();

    // to delete message
    const handleDeleteMessageClick = async (e) => {
        if(window.confirm("Are you sure?")){
            const messageId = e.target.id.split("_")[1];                
            try {
                const response = await axios.delete("/message?messageId=" + messageId);
                if(response.status === 200){
                    setMessages(messages.filter(m => m._id !== messageId));
                }
            } catch (error) {
                console.log(error);                
            }
        }
    }

    return (
        <div className="message-container-wrapper">
            <div className={`message-container ${own ? 'own' : ''}`} >
                <div className='message-text-wrapper'>
                    <p className='message-text'>{message.text}</p>
                    {
                        own &&
                        <i onClick={handleDisplayMessageMenuClick} id={`down-angle_${message._id}`} className='fa fa-angle-down'></i>
                    }
                    </div>
                <span className='message-time'>{format(message.createdAt)}</span>
                {
                    own &&
                    <div className={'message-menu-container ' + 'message-menu-container_' + message._id}>
                        <div>
                            <p id={`delete-message_${message._id}`} onClick={handleDeleteMessageClick}>Delete Message</p>
                        </div>
                    </div>
                }
            </div>
        </div>

    );
}

export default Message;