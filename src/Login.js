import { Button } from '@material-ui/core';
import React from 'react'
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';
import { auth, provider } from './firebase';
import earth from "./images/earth.png";
import "./Login.css";

function Login() {

    const dispatch = useDispatch();
    const signIn = () => {
        auth.signInWithPopup(provider).then(({ user }) => {
            dispatch(login({
                displayName: user.displayName,
                email: user.email,
                photoUrl: user.photoURL
            }));
            console.log(user);
        }).catch(error => alert(error.message));
    }

    return (
        <div className="login">
            <div className="login__container">
                <img src={earth} width="200px" alt="" />
                <h4>EARTHDRIVE</h4>
                <Button color="primary" variant="contained" onClick={signIn}>Sign with Google</Button>
            </div>
        </div>
    )
}

export default Login;
