import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFriendsWannabes, acceptFriendRequest, unfriend } from './actions';
import { Link } from 'react-router-dom';


class Friends extends React.Component {

    componentDidMount() {
        console.log('mounting Friends');
        this.props.dispatch(getFriendsWannabes());
    }

    render(){
        const { users } = this.props;
        const { friends } = this.props;
        const { wannabes } = this.props;


        if (!users) {
            return null;
        }


        const myFriends = (

            <div id="friends-wrapper">

                <h2>My friends</h2>
                <div className="all-friends">
                    {!!friends.length &&
                    friends.map(friend => (
                        <div className="friend-profile" key={friend.id}>
                            <Link to={"/user/" + friend.id}>
                                <div className="user-bio" >
                                    {!!friend.image_url && <img src={friend.image_url} className="avatar"/>}
                                    {!friend.image_url && <img src="/img/default-user.png"
                                        className="avatar"/>}
                                    <div className="user-name">
                                        <h3>{friend.first} {friend.last}</h3>
                                    </div>
                                </div>
                            </Link>
                            <div>
                                <button className="app-btn-on" onClick={
                                    () => {
                                        this.props
                                            .dispatch
                                            (unfriend(friend.id));
                                    }
                                }>Unfriend</button>
                            </div>
                        </div>
                    ))}
                    {!friends.length && <div>no friends</div>}
                </div>

                <h2>Friend requests</h2>
                <div className="all-wannabes">
                    {!!wannabes.length &&
                    wannabes.map(wannabe => (
                        <div className="friend-profile" key={wannabe.id}>

                            <div className="user-bio">
                                {!!wannabe.image_url && <img src={wannabe.image_url} className="avatar"/>}
                                {!wannabe.image_url && <img src="/img/default-user.png"
                                    className="avatar"/>}

                                <div className="user-name">
                                    <h3>{wannabe.first} {wannabe.last}</h3>
                                </div>
                            </div>
                            <div>
                                <button className="app-btn" onClick={
                                    () => {
                                        console.log('wannabe.id', wannabe.id);
                                        this.props
                                            .dispatch
                                            (acceptFriendRequest(
                                                wannabe.id));
                                    }
                                }>Add friend</button>
                            </div>
                        </div>
                    ))}
                    {!wannabes.length && <div>No requests</div>}
                </div>


            </div>



        );
        return (
            <div id="friends-wrapper">
                {!users.length && <div>nothing here</div>}
                {!!users.length && myFriends}
            </div>
        );
    }

}

const mapStateToProps = state => {

    return {

        users: state.users,
        friends: state.users && state.users.filter(user => user.status == 2),
        wannabes: state.users && state.users.filter( user => user.status == 1)
    };

};

export default connect(mapStateToProps)(Friends);
