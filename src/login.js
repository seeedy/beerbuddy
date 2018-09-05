import React from 'react';
// import axios with configuration object from axios.js
import axios from './axios';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submit() {
        axios.post('/login', {
            email: this.email,
            password: this.password,
        }).then(
            ({ data }) => {
                if (data.success) {
                    location.replace('/');
                } else {
                    this.setState({
                        error: true
                    });
                }
            }
        );
    }

    handleChange(e) {
        this[e.target.name] = e.target.value;
    }

    render() {
        return (
            <div className={`registration login`}>
                <div className="drop"></div>
                <div className="foam1"></div>
                <div className="foam2"></div>


                <input name="email" placeholder="Email..." onChange={ this.handleChange }/>
                <input name="password" placeholder="Password..." onChange={ this.handleChange }/>
                <button className="submit" onClick={ this.submit }>submit</button>

                { this.state.error && <div className="error">Try again!</div> }
            </div>
        );
    }
}
