import React from 'react';
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import earth from "../images/earth.png";
import { auth } from '../firebase';
import { logout, selectUser } from '../features/userSlice';
import { Button, Avatar } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';


function Navbar() {

    const user = useSelector(selectUser)

    const dispatch = useDispatch();

    return (
        <div className="navbar">
            <div className="navbar__left">

                <NavLink className="navbar__navlink" activeClassName="navbar__active" to="/photos"><img src={earth} width="70px" alt="" /></NavLink>
            </div>
            <div className="navbar__center">
                <NavLink className="navbar__navlink" activeClassName="navbar__active" to="/photos">Photos</NavLink>
                <NavLink className="navbar__navlink" activeClassName="navbar__active" to="/docs">Docs</NavLink>
                <NavLink className="navbar__navlink" activeClassName="navbar__active" to="/audios">Audios</NavLink>
                <NavLink className="navbar__navlink" activeClassName="navbar__active" to="/videos">Videos</NavLink>
                <NavLink className="navbar__navlink" activeClassName="navbar__active" to="/upload">Upload</NavLink>
            </div>
            <div className="navbar__right">
                <Button onClick={() => auth.signOut().then(() => dispatch(logout()))}>Logout</Button>
                <NavLink to="/profile"><Avatar src={user.photoUrl} sizes={"17px"} /></NavLink>
            </div>
        </div>
    )
}

export default Navbar;
