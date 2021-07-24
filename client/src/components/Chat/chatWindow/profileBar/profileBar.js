import path from 'path'
import axios from 'axios'

// css
import './profileBar.css'

// avatar image url
const AVATAR_IMG_URL = "images/user_images/avatar.jpg";

const ProfileBar = ({conversationUser, setCurrentChat}) => {

    const handleCloseButtonClick = (e) =>{
        e.preventDefault();
        setCurrentChat(null);
    }

    return (
        <div className='profileBar-container'>
            <div className='user-profile-container-wrapper'>
                <div className='user-profile-photo-container'>
                    <img
                        className='user-profile-photo'
                        src={path.join(__dirname, conversationUser ? conversationUser.photo ? conversationUser.photo : AVATAR_IMG_URL : AVATAR_IMG_URL)}
                        alt='contact-profile' />
                </div>
                <div className='user-name-container'>
                    <h3>{conversationUser?.firstName + " " + conversationUser?.lastName}</h3>
                </div>
            </div>

            <div className='close-chat-btn-container'>
                <button onClick={handleCloseButtonClick} className='button-style'>Close Chat</button>
            </div>
        </div>
    );
}

export default ProfileBar;