import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFriendsOfFriends, nullifyFof } from './actions';
import axios from './axios';


class FriendsOfFriends extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            prevId: this.props.friendId
        };
    }

    static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
        if (props.friendId !== state.prevId) {
            props.dispatch(nullifyFof());
            return {
                prevId: props.friendId,
            };
        }

        // No state update necessary
        return state;
    }

    componentDidMount() {
        // get the list of FoF
        const friendId = this.props.friendId;
        this.props.dispatch(getFriendsOfFriends(friendId));

        axios.get(`/get-user/${this.props.friendId}`)
            .then(response => {

                this.setState({
                    friendFirst: response.data.first
                });
            });

    }

    componentDidUpdate() {
        console.log('component is updating', this.state);
        if (this.props.fof === null) {
            this.props.dispatch(getFriendsOfFriends(this.props.friendId));
            axios.get(`/get-user/${this.props.friendId}`)
                .then(response => {

                    this.setState({
                        friendFirst: response.data.first
                    });
                });
        }
    }


    render() {
        const { fof } = this.props;

        if (!fof) {
            return null;
        }

        return (
            <div id="online-users-wrapper">
                <h2>{this.state.friendFirst}&#39;s friends</h2>
                <div className="online-users">
                    {fof.map(user => (
                        // if we use curly braces instead of parentheses here, we need to return!!
                        <div className="other-profile" key={user.id}>
                            <Link to={"/user/" + user.id}>
                                <div className="user-bio" >
                                    {!!user.image_url && <img src={user.image_url} className="avatar"/>}
                                    {!user.image_url && <img src="/img/default-user.png"
                                        className="avatar"/>}


                                    <div className="user-bio-text">
                                        <h3>{user.first} {user.last}</h3>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );

    }
}


const mapStateToProps = state => {
    return {
        fof: state.fof
    };
};


export default connect(mapStateToProps)(FriendsOfFriends);
