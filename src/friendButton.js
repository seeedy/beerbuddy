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
    }

    componentDidMount() {
        // on rendering user profile -> set button text
        axios.get(`/friends/${ this.props.otherId }`).then(response => {
            console.log('Mounting data: ', response.data, this.state);
            if (response.data) {

                if (response.data.status == 1) {
                    if (response.data.sender_id != this.props.otherId) {
                        this.setState({
                            buttonText: 'Cancel friend request',
                            buttonStatus: 1,
                            buttonFunction: 'cancel'
                        });
                    } else if (response.data.sender_id ==           this.props.otherId) {
                        this.setState({
                            buttonText: 'Accept friend request',
                            buttonStatus: 1,
                            buttonFunction: 'accept'
                        });
                    }
                } else if (response.data.status == 2) {
                    this.setState({
                        buttonText: 'End friendship',
                        buttonStatus: 2,
                        buttonFunction: 'end'
                    });
                }

            } else {
                console.log('no response.data');
                this.setState({
                    buttonText: 'Send friend request',
                    buttonStatus: 0
                });
            }
        });
    }


    clickHandler() {
        if (this.state.buttonStatus == 0) {
            axios.post(`/friends/${ this.props.otherId }`)
                .then(response => {

                    this.setState(response.data);

                });
        } else if (this.state.buttonFunction == 'cancel') {
            axios.post(`/friends/cancel/${ this.props.otherId }`)
                .then(response => {

                    this.setState(response.data);

                });
        } else if (this.state.buttonFunction == 'accept') {
            axios.post(`/friends/accept/${ this.props.otherId }`)
                .then(response => {

                    this.setState(response.data);

                });
        } else if (this.state.buttonFunction == 'end') {
            axios.post(`/friends/end/${ this.props.otherId }`)
                .then(response => {

                    console.log('end', response.data);

                    this.setState(response.data);

                });
        }
    }





    render() {
        return <button
            className="friend-btn"
            onClick={ this.clickHandler }>
            { this.state.buttonText }
        </button>;
    }
}
