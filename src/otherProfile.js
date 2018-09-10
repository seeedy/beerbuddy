import React from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';


export default class OtherProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            first: '',
            last: '',
            imageUrl: '',
            bio: ''
        };
    }
    // async componentDidMount() {
    //     const resp = await axios.get(`/get-user/${this.props.match.params.userId}`);
    //     console.log('resp from axios', resp);
    // }

    componentDidMount() {
        axios.get(`/get-user/${this.props.match.params.userId}`)
            .then(response => {

                if (response.data.ownProfile) {
                    console.log('own profile is true');
                    this.props.history.push('/');
                }

                let otherUser = response.data;
                if (!otherUser.image_url) {
                    otherUser.image_url = "/img/default-user.png";
                }

                this.setState({
                    id: otherUser.id,
                    first: otherUser.first,
                    last: otherUser.last,
                    imageUrl: otherUser.image_url,
                    bio: otherUser.bio
                });
            });
    }


    render() {
        return (
            <div className="profile">

                <div className="user-bio">
                    <img
                        src={ this.state.imageUrl }
                        className="profile-pic"
                    />

                    <div className="user-bio-text">
                        <h2>{ this.state.first } { this.state.last }</h2>
                        <p>{ this.state.bio }</p>
                    </div>
                </div>

                <div>
                    <button className="friend-btn">buttonText</button>
                </div>
            </div>
        );
    }
}

//
// let buttonText = 'Make Friend Request';
// if (data) {
//     if (data.status == 2) {
//         buttonText = 'End Friendship';
//     } else if (data.status == 1) {
//         if (this.props.otherUserId == data.sender) {
//             buttonText = 'Accept friendship';
//         }
//     }
// }

// new routes for making, accepting, rejecting, ending friend request
