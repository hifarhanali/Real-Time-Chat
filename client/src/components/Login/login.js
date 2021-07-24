import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Login = ({setLoginUser}) => {

    const getLoginUserDetail = async () => {
        const DUMMY_LOGIN_USERID = document.getElementById('userId').value;
        try {
            const res = await axios.get('/user?userId=' + DUMMY_LOGIN_USERID);
            setLoginUser(res.data.user);
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        getLoginUserDetail();
    }

    return(
        <div>
            <div>
                <label>
                    UserId: 
                    <input id='userId' type='text' placeholder='User Id' />
                </label>
            </div>
            <div>
                <label>
                    Password: 
                    <input id='userPassword' type='password' placeholder='Password' />
                </label>
            </div>
            <button onClick={handleLoginSubmit}>Login</button>
        </div>
    );
};

export default Login;