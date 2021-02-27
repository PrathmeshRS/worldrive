import { useState } from 'react';
import { db } from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { useHistory } from 'react-router-dom';
import "./Upload.css";
import { IconButton } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
const React = require('react');
const CreateIPFSClient = require('ipfs-http-client');



const ipfsClient = CreateIPFSClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });


function Upload() {

    const [ext, setExt] = useState("");
    const [process, setProcess] = useState("");
    const [exist, setExist] = useState([]);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    let ftype = null;

    const [added_file_hash, setFileHash] = useState(null);

    const user = useSelector(selectUser);

    const history = useHistory();


    const captureFile = function (event) {
        setProcess("Wait till we process the file");
        event.stopPropagation()
        event.preventDefault();
        saveToIpfs(event.target.files);
        setExt(event.target.files[0].name.split('.').pop());
    }

    const saveToIpfs = async function ([file]) {
        try {
            const added = await ipfsClient.add(file)
            setFileHash(added.cid.toString())
        } catch (err) {
            console.error(err)
        }
        setProcess("");
    }

    const fileExists = async () => {
        await db.collection('data').where('user', '==', user.email).where('file', '==', added_file_hash).onSnapshot(snapshot => snapshot.docs.map(doc => setExist({
            id: doc.id,
            file: doc.data()
        })));
    }

    const pushFiles = async () => {
        if (exist.length === 0) {
            await db.collection('data').add({
                file: added_file_hash,
                user: user.email,
                filename: name,
                description: desc,
                date: date,
                ftype: ftype
            })
        }
    }

    const handleSubmit = function (event) {
        event.preventDefault();
        console.log(ext);
        if (ext === 'jpg' || ext === 'png' || ext === 'jpeg' || ext === 'gif') ftype = "image";
        else if (ext === 'mp4' || ext === 'mov' || ext === 'wmv') ftype = "video";
        else if (ext === 'doc' || ext === 'pdf' || ext === 'docx') ftype = "document";
        else if (ext === 'mp3' || ext === 'wav') ftype = "audio";

        if (added_file_hash && name && desc && date) {
            fileExists();

            console.log(exist);

            pushFiles();

            history.push("/");
        }
    }




    if (ipfsClient) {
        return (
            <div className="upload">
                <div className="upload__form">
                    <form id='capture-media' onSubmit={handleSubmit} className="ui form">
                        <div className="upload__formLeft" style={{ backgroundImage: added_file_hash ? `url(https://ipfs.infura.io/ipfs/${added_file_hash}+)` : "none" }}>
                            <input className="input" type='file' name='input-file' id='input-file' onChange={captureFile} required />
                            <IconButton id="icon-button" onClick={(e) => document.getElementById('input-file').click()}><PublishIcon /></IconButton>
                            <h4>{added_file_hash ? "File Processed Successfully" : process}</h4>
                        </div>
                        <div className="upload__formRight">

                            <input className="input" value={name} placeholder="Name of your file" onChange={(e) => setName(e.target.value)} type='text' name='name' id='file-name' required />
                            <input className="input" value={desc} placeholder="A description of your file" onChange={(e) => setDesc(e.target.value)} type='text' name='desc' id='description' required />
                            <input
                                className="ui input"
                                type="date"
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                            <button className="ui button" type="submit" >Upload</button>
                        </div>
                    </form>
                </div>
            </div >

        )

    }
}

export default Upload;
