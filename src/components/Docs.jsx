import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from '../firebase';
import Card from './Card';
import "./Docs.css";

function Docs() {
    const [files, setFiles] = useState([]);
    const user = useSelector(selectUser);
    let unsubscribe;

    const getDocs = async () => {
        unsubscribe = db.collection('data').where('user', '==', user.email).where('ftype', '==', 'document').onSnapshot(snapshot => setFiles(snapshot.docs.map(doc => ({
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
        getDocs();

        return () => {
            unsubscribe();
        }
    }, [])
    return (
        <div className="docs">

            {files.map(file => <Card
                filehash={file.filehash}
                filename={file.filename}
                date={file.date}
                desc={file.desc}
                id={file.id}
                key={file.id}
                ftype={file.ftype} />)}
        </div>
    )
}

export default Docs;
