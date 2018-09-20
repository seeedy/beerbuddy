import React from 'react';
import axios from './axios';
import FriendButton from './friendButton';
// import { Link } from 'react-router-dom';


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


    componentDidMount() {
        axios.get(`/get-user/${this.props.match.params.userId}`)
            .then(response => {

                if (response.data.ownProfile) {
                    console.log('own profile is true');
                    this.props.history.push('/editProfile');
                }

                let otherUser = response.data;

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
            <div className="other-profile">

                <div className="user-bio">
                    {!!this.state.imageUrl && <img src={this.state.imageUrl} className="avatar"/>}
                    {!this.state.imageUrl && <img src="/img/default-user.png"
                        className="avatar"/>}


                    <div className="user-bio-text">
                        <h2>{ this.state.first } { this.state.last }</h2>

                        <div>
                            <h3 className="about-me">About me:</h3>
                            <p>{ this.state.bio }</p>
                        </div>

                        <div>
                            <h3 className="about-me">Favorite beer:</h3>
                            <p>{ this.state.favBeer }</p>
                        </div>

                        <div>
                            <h3 className="about-me">Favorite bar:</h3>
                            <p>{ this.state.favBar }</p>
                        </div>
                    </div>
                </div>

                <div className="btn-div">
                    <FriendButton
                        otherId={ this.props.match.params.userId }/>
                </div>
            </div>
        );
    }
}
