import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class OnlineUsers extends React.Component {

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
                        <div className="other-profile" key={user.id}>
                            <Link to={"/user/" + user.id}>
                                <div className="user-bio" >
                                    {!!user.image_url && <img src={user.image_url} className="avatar"/>}
                                    {!user.image_url && <img src="/img/default-user.png"
                                        className="avatar"/>}

                                    <div className="green-online-dot"></div>

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
        onlineUsers: state.onlineUsers
    };
};


export default connect(mapStateToProps)(OnlineUsers);
