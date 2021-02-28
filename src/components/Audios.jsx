
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from '../firebase';
import "./Audios.css";

function Audios() {
    const [files, setFiles] = useState([]);
    const user = useSelector(selectUser);

    let unsubscribe;

    const getAudios = async () => {
        unsubscribe = await db.collection('data').where('user', '==', user.email).where('ftype', '==', 'audio').onSnapshot(snapshot => setFiles(snapshot.docs.map(doc => ({
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
        getAudios();

        return () => {
            unsubscribe();
        }

    }, [])

    return (
        <div className="audios">
            {files.map(file => <div className="audiofile">
                <audio controls preload><source src={`https://ipfs.infura.io/ipfs/${file.filehash}`} type="" /></audio><div className="audio__info">
                    <div className="audio__meta"><h4>{file.filename.substr(0, 20)}</h4><span>{file.date}</span></div>

                    <div className="audio__footer">
                        <p>{file.desc.substr(0, 29) + '...'}</p> <a href={`https://ipfs.infura.io/ipfs/${file.filehash}`}>View</a>
                    </div>
                </div></div>)}
        </div>
    )
}

export default Audios;
