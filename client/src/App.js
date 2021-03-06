import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";


import Chat from './components/Chat/chat';
import Signup from './components/Signup/signup';

const App = () => {

    const [loginUser, setLoginUser] = useState(null);

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {
                        loginUser
                            ? <Chat loginUser={loginUser} />
                            : <Signup setLoginUser={setLoginUser} />
                    }
                </Route>
                <Route path="/chat">
                    {loginUser ? <Redirect to="/" /> : <Chat loginUser={loginUser} />}
                </Route>
            </Switch>
        </Router>
    );
};

export default App;