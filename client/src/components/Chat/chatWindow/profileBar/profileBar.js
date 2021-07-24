import path from 'path'
import axios from 'axios'

// css
import './profileBar.css'

// avatar image url
const AVATAR_IMG_URL = "images/user_images/avatar.jpg";

const ProfileBar = ({conversationUser}) => {

    return (
        <div className='profileBar-container'>
            <div className='user-profile-photo-container'>
                <img
                className='user-profile-photo'
                src={path.join(__dirname, conversationUser? conversationUser.photo? conversationUser.photo : AVATAR_IMG_URL : AVATAR_IMG_URL)}
                alt='contact-profile'/>
            </div>
            <div className='user-name-container'>
                <h3>{conversationUser?.firstName + " " + conversationUser?.lastName}</h3>
            </div>
        </div>
    );
}

export default ProfileBar;