import React from 'react';
import axios from './axios';


export default class FriendButton extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            buttonText: '',
            buttonStatus: 0,
            buttonFunction: ''
        };

        this.clickHandler = this.clickHandler.bind(this);
        this.getButtonText = this.getButtonText.bind(this);
    }

    async componentDidMount() {
        // on rendering user profile -> set button text
        const response = await
        axios.get(`/friends/${ this.props.otherId }`);
        console.log('Mounting data: ', response);

        if (response.data) {
            this.getButtonText(response.data.status, response.data.sender_id);
        } else {
            this.getButtonText(0, 0);
        }
    }

    getButtonText(status, sender_id) {

        if (status == 0) {
            this.setState({
                buttonText: 'Send friend request',
                buttonStatus: 0
            });
        } else if (status == 1) {
            if (sender_id != this.props.otherId) {
                this.setState({
                    buttonText: 'Cancel friend request',
                    buttonStatus: '1a',
                });
            } else if (sender_id == this.props.otherId) {
                this.setState({
                    buttonText: 'Accept friend request',
                    buttonStatus: '1b',
                });
            }
        } else if (status == 2) {
            this.setState({
                buttonText: 'End friendship',
                buttonStatus: 2,
            });
        }
    }


    clickHandler() {

        console.log('clickhandler');

        if (this.state.buttonStatus == 0) {
            axios.post(`/friends/${ this.props.otherId }`)
                .then(response => {

                    let { status, sender_id } = response.data;
                    this.getButtonText(status, sender_id);

                });
        } else if (this.state.buttonStatus == '1a') {
            axios.post(`/friends/cancel/${ this.props.otherId }`)
                .then(() => {

                    this.getButtonText(0, 0);

                });
        } else if (this.state.buttonStatus == '1b') {
            axios.post(`/friends/accept/${ this.props.otherId }`)
                .then(response => {

                    let { status, sender_id } = response.data;
                    this.getButtonText(status, sender_id);

                });
        } else if (this.state.buttonStatus == '2') {
            axios.post(`/friends/end/${ this.props.otherId }`)
                .then(() => {

                    this.getButtonText(0, 0);

                });
        }
    }



    render() {
        console.log('rendering');
        return <button
            className="friend-btn"
            onClick={ this.clickHandler }>
            { this.state.buttonText }
        </button>;
    }
}
