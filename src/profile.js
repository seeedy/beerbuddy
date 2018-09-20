import React from 'react';


export default function Profile(props) {

    return (
        <div className="profile">

            <div className="user-bio">

                <img
                    src={ props.imageUrl }
                    className="avatar"
                />

                <div className="user-bio-text">

                    <h2>{ props.first } {props.last }</h2>


                    <div>
                        <p>{ props.bio }</p>
                        <div className="user-bio-edit">
                            <a href="/editProfile">
                                <i className="fas fa-user-edit"></i>
                                <span className="tooltip">Edit profile</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
