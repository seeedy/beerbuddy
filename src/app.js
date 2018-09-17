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
            showBio: false
        };

        /// !!!!!!!! ALWAYS BIND THE METHODS TO THIS !!!!!!!
        this.showUploader = this.showUploader.bind(this);
        this.updateImage = this.updateImage.bind(this);
        this.closeUploader = this.closeUploader.bind(this);
        this.toggleBio = this.toggleBio.bind(this);
        this.setBio = this.setBio.bind(this);
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

    toggleBio() {
        this.setState({
            showBio: !this.state.showBio
        });
    }

    setBio(e) {
        if (e.which === 13) {
            this.setState({
                bio: e.target.value,
                showBio: false
            });


            axios.post('/profile', {
                bio: e.target.value
            });
        }
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
                        <i className="fas fa-globe"></i>
                    Chat</a>

                    <a href="/online">
                        <i className="fas fa-globe"></i>
                    Online Users</a>

                    <a href="/friends">
                        <i className="fas fa-user-friends"></i>
                    Friends</a>

                    <a href="/logout">Logout</a>

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

                <div className="app-content">

                    <div className="left-dashboard">
                        <Profile
                            first={ this.state.first }
                            last={ this.state.last }
                            imageUrl={ this.state.imageUrl }
                            bio={ this.state.bio }
                            showBio={ this.state.showBio }
                            toggleBio={ this.toggleBio }
                            setBio={ this.setBio }
                        />
                    </div>
                    <BrowserRouter>
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
                        </div>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}
