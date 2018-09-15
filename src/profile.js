import React from 'react';


export default function Profile(props) {

    return (
        <div className="profile">


            <div className="user-bio">


                <img
                    src={ props.imageUrl }
                    className="profile-pic"
                    onClick={ props.clickHandler }
                />

                <div className="user-bio-text">

                    <h2>{ props.first } {props.last }</h2>

                    {props.showBio ? (
                        <textarea
                            onKeyDown={ props.setBio }
                            defaultValue={ props.bio }
                        />
                    ) : (
                        <div>
                            <p>{ props.bio }</p>
                            <div className="user-bio-edit">
                                <i className="fas fa-user-edit" onClick={ props.toggleBio }></i>
                                <span className="tooltip">Edit bio</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
