import React from 'react';
import axios from './axios';
import Logo from './logo';
import ProfilePic from './profilepic';
import Uploader from './uploader';
import Profile from './profile';
import { BrowserRouter, Route } from "react-router-dom";

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
        axios.get('user').then(
            ({ data }) => {
                if (!data.imageUrl) {
                    data.imageUrl = "img/default-user.png";
                }
                console.log(data);
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
            <div className="main">
                <div className="header">
                    <Logo />
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
                    <Route path="/" render={() => (
                        <Profile
                            first={ this.state.first }
                            last={ this.state.last }
                            imageUrl={ this.state.imageUrl }
                            bio={ this.state.bio }
                            showBio={ this.state.showBio }
                            toggleBio={ this.toggleBio }
                            setBio={ this.setBio }
                        />
                    )}
                    />
                </BrowserRouter>
            </div>
        );
    }
}
