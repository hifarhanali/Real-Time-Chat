import path from 'path'

// css
import './profileBar.css'

// avatar image url
const AVATAR_IMG_URL = "images/user_images/avatar.jpg";


const ProfileBar = () => {
    return (
        <div className='profileBar-container'>
            <div className='user-profile-photo-container'>
                <img className='user-profile-photo' src={path.join(__dirname, AVATAR_IMG_URL)} alt='contact-profile'/>
            </div>
            <div className='user-name-container'>
                <h3>Farhan Ali</h3>
            </div>
        </div>
    );
}

export default ProfileBar;