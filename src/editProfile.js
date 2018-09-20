import React from 'react';
import axios from './axios';


export default class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.toggleBio = this.toggleBio.bind(this);
        this.toggleBar = this.toggleBar.bind(this);
        this.toggleBeer = this.toggleBeer.bind(this);

        this.updateBio = this.updateBio.bind(this);
        this.updateBeer = this.updateBeer.bind(this);
        this.updateBar = this.updateBar.bind(this);
    }


    componentDidMount() {

        this.setState({
            showBio: false,
            showBeer: false,
            showBar: false
        });
    }

    toggleBio() {
        console.log('toggling bio');
        this.setState({
            showBio: !this.state.showBio
        });
    }

    toggleBeer() {
        console.log('toggling beer');
        this.setState({
            showBeer: !this.state.showBeer
        });
    }

    toggleBar() {
        console.log('toggling bar');
        this.setState({
            showBar: !this.state.showBar
        });
    }

    updateBio(e) {
        console.log('updating bio');
        if (e.which === 13) {
            axios.post('/updateBio', {
                bio: e.target.value
            });
            // send bio to parent component
            this.props.setBio(e.target.value);
            // hide textarea
            this.setState({ showBio: false });
        }
    }

    updateBeer(e) {
        console.log('updating beer');
        if (e.which === 13) {
            axios.post('/updateBeer', {
                favBeer: e.target.value
            });
            // send bio to parent component
            this.props.setBeer(e.target.value);
            // hide textarea
            this.setState({ showBeer: false });
        }
    }

    updateBar(e) {
        console.log('updating bar');
        if (e.which === 13) {
            axios.post('/updateBar', {
                favBar: e.target.value
            });
            // send bio to parent component
            this.props.setBar(e.target.value);
            // hide textarea
            this.setState({ showBar: false });
        }
    }

    render() {
        return (
            <div className="other-profile">

                <div className="user-bio">

                    <div className="my-profile-avatar">
                        {!!this.props.imageUrl && <img src={ this.props.imageUrl } className="avatar"/>}
                        {!this.props.imageUrl && <img src="/img/default-user.png"
                            className="avatar"/>}
                    </div>


                    <div className="user-bio-text">
                        <h2>{ this.props.first } { this.props.last }</h2>
                        <div>
                            <p className="join-date">Joined { this.props.joinDate }</p>
                        </div>

                        <div>
                            <h3 className="about-me">About me:</h3>
                            {this.state.showBio ? (
                                <textarea
                                    onKeyDown={ this.updateBio }
                                    defaultValue={ this.props.bio }
                                />
                            ) : (
                                <div>
                                    <p>{ this.props.bio || "add your bio" }</p>
                                    <i className="fas fa-edit"
                                        onClick={ this.toggleBio }></i>
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className="about-me">My favorite beer:</h3>
                            {this.state.showBeer ? (
                                <textarea
                                    onKeyDown={ this.updateBeer }
                                    defaultValue={ this.props.favBeer }
                                />
                            ) : (
                                <div>
                                    <p>{ this.props.favBeer || "add your favorite beer" }</p>
                                    <i className="fas fa-edit"
                                        onClick={ this.toggleBeer }></i>
                                </div>
                            )}
                        </div>

                        <div>
                            <h3 className="about-me">My favorite bar:</h3>
                            {this.state.showBar ? (
                                <textarea
                                    onKeyDown={ this.updateBar }
                                    defaultValue={ this.props.favBar }
                                />
                            ) : (
                                <div>
                                    <p>{ this.props.favBar || "add your favorite place to drink" }</p>
                                    <i className="fas fa-edit"
                                        onClick={ this.toggleBar }></i>
                                </div>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}
