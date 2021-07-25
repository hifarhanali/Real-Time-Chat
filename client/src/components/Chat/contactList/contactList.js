import { useEffect } from 'react';

import Contact from './contact/contact';

// import css
import './contactList.css'

const ContactList = (props) => {

    return (
        <>
            <div className='contacts-list-header'>
                <p>Contacts</p>
            </div>
            {
                props.conversationList &&
                props.conversationList.map(conversation => (
                    <div key={conversation._id}
                        onClick={() => props.setCurrentChat(conversation)}
                    >
                        <Contact conversation={conversation} loginUser={props.loginUser} />
                    </div>
                ))
            }
        </>
    );
}

export default ContactList;