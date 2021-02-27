import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { db } from "../firebase";
import Card from "./Card";
import "./Homepage.css";

function Homepage() {

    const [files, setFiles] = useState([]);
    const user = useSelector(selectUser);
    let unsubscribe;

    const getData = async () => {
        unsubscribe = await db.collection('data').where('user', '==', user.email).onSnapshot(snapshot => setFiles(snapshot.docs.map(doc => ({
            filehash: doc.data().file,
            id: doc.id,
            user: doc.data().user,
            filename: doc.data().filename,
            date: doc.data().date,
            desc: doc.data().description,
            ftype: doc.data().ftype
        }))));
    }
    useEffect(() => {
        getData();

        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div className="homepage">
            <div className="cards">

                {files.map(file => <Card
                    filehash={file.filehash}
                    filename={file.filename}
                    date={file.date}
                    desc={file.desc}
                    id={file.id}
                    key={file.id}
                    ftype={file.ftype}
                />)}
            </div>
        </div >
    )
}

export default Homepage;
