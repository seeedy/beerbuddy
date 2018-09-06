import React from 'react';
import axios from './axios';


export default function Uploader(props) {

    let file;

    function submit(e) {
        e.preventDefault();

        file = e.target.files[0];
        console.log(file);

        const fd = new FormData;
        fd.append('file', file);

        axios.post('/profilepic', fd).then(
            ({data}) => {
                props.updateImage(data.imageUrl);
            }
        );
    }

    return (
        <div className="uploader">
            <h2>Choose new profile picture</h2>
            <input
                name="file"
                type="file"
                accept = "image/*"
                className="file-input"
                onChange={submit}
            />
            <label className="uploader-label" htmlFor="file">upload</label>
        </div>
    );
}
