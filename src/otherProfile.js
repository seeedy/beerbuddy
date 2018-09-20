import React from 'react';
import axios from './axios';
import FriendButton from './friendButton';
// import { Link } from 'react-router-dom';


export default class OtherProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            prevId: this.props.match.params.userId
        };
    }

    static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
        if (props.match.params.userId !== state.prevId) {
            return {
                prevId: props.match.params.userId,
                first: null
            };
        }

        // No state update necessary
        return null;
    }


    componentDidMount() {
        axios.get(`/get-user/${this.props.match.params.userId}`)
            .then(response => {

                if (response.data.ownProfile) {
                    console.log('own profile is true');
                    this.props.history.push('/editProfile');
                }
                this.setState(response.data);
            });
    }

    componentDidUpdate() {
        if (this.state.first === null) {
            axios.get(`/get-user/${this.props.match.params.userId}`)
                .then(response => {
                    this.setState(response.data);
                });
        }
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
                            <p className="join-date"><i className="far fa-calendar-alt"></i> Joined { this.state.joinDate }</p>
                        </div>
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
