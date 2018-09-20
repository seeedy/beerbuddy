import React from 'react';

export default function ProfilePic(props) {

    return (
        <div className="user-avatar-div">
            <img src={ props.imageUrl }
                className="header-avatar"
                onClick={ props.clickHandler }
            />

        </div>
    );
}
