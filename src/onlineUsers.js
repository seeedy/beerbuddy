import React from 'react';
import { connect } from 'react-redux';
// import { getOnlineUsers } from './actions';

class OnlineUsers extends React.Component {

    componentDidMount() {

    }

    render() {

        const { onlineUsers } = this.props;
        console.log('mounting onlineUsers', onlineUsers);

        if (!onlineUsers) {
            return null;
        }

        return (
            <div id="online-users-wrapper">
                <h2>Online users</h2>
                <div className="online-users">
                    {onlineUsers.map(user => (
                        // if we use curly braces instead of parentheses here, we need to return!!
                        <div className="friend-profile" key={user.id}>
                            <div className="user-bio" >
                                {!!user.image_url && <img src={user.image_url} className="avatar"/>}
                                {!user.image_url && <img src="/img/default-user.png"
                                    className="avatar"/>}

                                <div className="user-bio-text">
                                    <h3>{user.first} {user.last}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );

    }
}


const mapStateToProps = state => {
    return {
        onlineUsers: state.onlineUsers
    };
};


export default connect(mapStateToProps)(OnlineUsers);
