import React, { useState} from 'react';
import axiosAPI from 'axios';

import './signup.css'


const Signup = ({setLoginUser}) => {
    const axios = axiosAPI.create({
        baseURL: "http://localhost:5000"
    })


    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        username: ""
    });

    // to handle change in input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    // to handle sign up button click
    const handleSignupClick = (e) => {
        e.preventDefault();
        const errorMessageSpanContainer = document.querySelector(".error-msg-span-container");
        const errorMessageSpan = errorMessageSpanContainer.querySelector('.error-msg-span');

        errorMessageSpanContainer.style.backgroundColor = "rgba(255, 2, 2, 0.3)";
        errorMessageSpan.style.color = "red";

        try {
            if (user.firstName && user.lastName && user.username) {
                axios.post('/user/', user).then((res) => {

                    // user has been registered successfully
                    if (res.data.user) {
                        setLoginUser(res.data.user);
                        errorMessageSpanContainer.style.backgroundColor = "rgba(2, 255, 2, 0.3)";
                        errorMessageSpan.style.color = "white";                        
                    }
                    errorMessageSpan.innerHTML = res.data.message;
                });
            }
            else {
                errorMessageSpanContainer.querySelector(".error-msg-span").innerHTML = "Please Enter Valid Inputs!";
            }
            errorMessageSpanContainer.style.display = "block";
        }
        catch (error) {
            console.log(error);
        }

    }    
 
    return (
        <div className='signup-container-wrapper'>
            <div className='signup-container'>
                <div className='input-container'>
                    <p>First Name</p>
                    <input name="firstName" value={user.firstname} onChange={handleInputChange} type='text' placeholder='First Name' />

                </div>
                <div className='input-container'>
                    <p>Last Name</p>
                    <input name="lastName" value={user.lastname} onChange={handleInputChange} type='text' placeholder='Last Name' />
                </div>
                <div className='input-container'>
                    <p>Username</p>
                    <input name="username" value={user.username} onChange={handleInputChange} type='text' placeholder='Username' />
                </div>
                <button className='button-style' onClick={handleSignupClick}>Sign Up</button>
                <div className='error-msg-span-container'>
                    <span className='error-msg-span'></span>
                </div>
            </div>
        </div>
    );
};

export default Signup;