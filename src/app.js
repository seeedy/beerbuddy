import React from 'react';
import axios from './axios';
import Logo from './logo';
import ProfilePic from './profilepic';
import Uploader from './uploader';
import Profile from './profile';
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from './otherProfile';
import Friends from './friends';
import OnlineUsers from './onlineUsers';
import Chat from './chat';
import EditProfile from './editProfile';
import FriendsOfFriends from './fof';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            first: '',
            last: '',
            email: '',
            bio: '',
            imageUrl: '',
            showBio: false,
            joinDate: ''
        };

        /// !!!!!!!! ALWAYS BIND THE METHODS TO THIS !!!!!!!
        this.showUploader = this.showUploader.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.closeUploader = this.closeUploader.bind(this);
        this.setBio = this.setBio.bind(this);
        this.setBeer = this.setBeer.bind(this);
        this.setBar = this.setBar.bind(this);

    }

    componentDidMount() {
        axios.get('/user').then(
            ({ data }) => {
                if (!data.imageUrl) {
                    data.imageUrl = "/img/default-user.png";
                }
                this.setState(data);

            }
        );
    }

    showUploader() {
        this.setState({
            uploaderShown: true
        });
    }

    updateImage(imageUrl) {

        this.setState({
            imageUrl: imageUrl,
            uploaderShown: false
        });
    }

    closeUploader() {
        this.setState({
            uploaderShown: false
        });
    }

    setBio(bio) {
        this.setState({
            bio: bio,
        });
    }

    setBeer(beer) {
        this.setState({
            favBeer: beer,
        });
    }

    setBar(bar) {
        this.setState({
            favBar: bar,
        });
    }

    render() {
        // account for time for loading data, show loading bar
        if (!this.state.id) {
            return (
                <div>
                    Loading...
                </div>
            );
        }
        return (
            <div id="page-outer">
                <div className="header">
                    <Logo />

                    <a href="/chat">
                        <i className="fas fa-comments"></i>
                    Chat</a>

                    <a href="/online">
                        <i className="fas fa-globe"></i>
                    Online Users</a>

                    <a href="/friends">
                        <i className="fas fa-user-friends"></i>
                    Friends</a>

                    <a href="/logout">
                        <i className="fas fa-sign-out-alt"></i>
                    Logout</a>

                    <ProfilePic
                        imageUrl={ this.state.imageUrl }
                        first={ this.state.first }
                        last={ this.state.last }
                        clickHandler={ this.showUploader } />

                </div>
                {this.state.uploaderShown &&
                    <Uploader
                        updateImage={ this.updateImage }
                        clickHandler={ this.closeUploader } />}



                <BrowserRouter>

                    <div className="app-content">

                        <div className="left-dashboard">
                            <Profile
                                first={ this.state.first }
                                last={ this.state.last }
                                imageUrl={ this.state.imageUrl }
                                bio={ this.state.bio }
                                joinDate={ this.state.joinDate }
                                setBio={ this.setBio }
                            />

                            <Route
                                exact path="/"
                                component={ OnlineUsers }
                            /><Route
                                exact path="/chat"
                                component={ OnlineUsers }
                            />
                            <Route
                                exact path="/friends"
                                component={ OnlineUsers }
                            />
                            <Route
                                exact path="/editProfile"
                                component={ OnlineUsers }
                            />
                            <Route
                                exact path="/user/:userId"
                                render={ () =>  (
                                    <FriendsOfFriends
                                        ownId={ this.state.id }
                                    />
                                )}                            
                            />
                        </div>


                        <div className="router-content">

                            <Route
                                exact path="/user/:userId"
                                component={ OtherProfile }
                            />
                            <Route
                                exact path="/friends"
                                component={ Friends }
                            />
                            <Route
                                exact path="/online"
                                component={ OnlineUsers }
                            />
                            <Route
                                exact path="/chat"
                                component={ Chat }
                            />
                            <Route
                                exact path="/editProfile"
                                render={ () =>  (
                                    <EditProfile
                                        first={ this.state.first }
                                        last={ this.state.last }
                                        imageUrl={ this.state.imageUrl }
                                        bio={ this.state.bio }
                                        favBeer={ this.state.favBeer }
                                        favBar={ this.state.favBar }
                                        joinDate={ this.state.joinDate }
                                        setBio={ this.setBio }
                                        setBar={ this.setBar }
                                        setBeer={ this.setBeer }
                                    />
                                )}
                            />
                        </div>
                    </div>
                </BrowserRouter>

            </div>
        );
    }
}
