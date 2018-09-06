import React from 'react';

export default function ProfilePic(props) {

    return (
        <div className="profile">
            <img src={props.imageUrl} className="profile-pic"
                onClick={props.clickHandler}
            />
        </div>
    );
}
