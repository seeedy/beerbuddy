import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFriendsOfFriends } from './actions';

class FriendsOfFriends extends React.Component {

    componentDidMount() {
        const friendId = window.location.pathname.split("/").slice(-1)[0];
        console.log('friendId', friendId);
        this.props.dispatch(getFriendsOfFriends(friendId));
        console.log('props', this.props);
    }


    render() {
        const { fof } = this.props;

        if (!fof) {
            return null;
        }

        return (
            <div id="online-users-wrapper">
                <h2>FoF</h2>
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
