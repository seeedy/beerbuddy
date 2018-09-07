import React from 'react';


export default function Profile(props) {

    return (
        <div className="profile">
            <img
                src={ props.imageUrl }
                className="profile-pic"
                onClick={ props.clickHandler }
            />

            <div className="bio-text">
                <h2>{ props.first } {props.last }</h2>

                {props.showBio ? (
                    <textarea
                        onKeyDown={ props.setBio }
                        defaultValue={ props.bio }
                    />
                ) : (
                    <button onClick={ props.toggleBio }>Edit profile info</button>
                )}
            </div>

        </div>
    );
}
