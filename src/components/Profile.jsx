import { Avatar, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { auth, db } from '../firebase';
import "./Profile.css";

function Profile() {

    const [files, setFiles] = useState([]);

    const user = useSelector(selectUser);

    let unsubscribe;

    const getData = async () => {
        unsubscribe = await db.collection('data').where('user', '==', user.email).onSnapshot(snapshot => setFiles(snapshot.docs.map(doc => ({
            id: doc.id,
        }))))
    }

    useEffect(() => {
        getData();

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <div className="profile">
            <div className="profile__user">
                <Avatar style={{ width: "100px", height: "100px", border: "4px solid white", background: "white" }} src={user.photoUrl} />
                <div className="profile__details">
                    <div className="profile__detailsItem"><div>Name:</div> <span>{user.displayName}</span></div>
                    <div className="profile__detailsItem"><div>Email:</div>   <span>{user.email}</span></div>
                    <div className="profile__detailsItem"><div>Usage:</div>   <span>{files.length} files</span></div>
                </div>
            </div>
            <Button onClick={() => auth.signOut()}>Signout</Button>
        </div>
    )
}

export default Profile
