import React from 'react';
import axios from './axios';
import Logo from './logo';
import ProfilePic from './profilepic';
import Uploader from './uploader';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.showUploader = this.showUploader.bind(this);
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
        console.log('click');
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

    render() {
        if (!this.state.id) {
            return (
                <div>
                    <img src="progressbar.gif"/>
                </div>
            );
        }
        return (
            <div>
                <Logo />
                <ProfilePic
                    imageUrl={ this.state.imageUrl }
                    first={ this.state.first }
                    last={ this.state.last }
                    clickHandler={ this.showUploader }
                />
                {this.state.uploaderShown &&
                    <Uploader updateImage={ this.updateImage } />}
            </div>
        );
    }
}
