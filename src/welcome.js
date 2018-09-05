import React from 'react';
import Registration from './registration';
import Login from './login';
import { Link, HashRouter, Route } from 'react-router-dom';

export default function Welcome() {

    let logoStyle = {
        color: "gold",
        fontSize: "80px",
        fontFamily: "Helvetica",
        border: "15px solid gold",
        padding: "10px",
        margin: "20px auto",
        fontWeight: 800,
        textAlign: "center",
    };
    return (

        <div className="wrapper">
            <h1>Welcome to</h1>
            <h1 style={logoStyle}>BEER LOVERS</h1>
            <HashRouter>
                <div className="routerbox">
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <p>Already registered? <Link to="/login">Login here!</Link></p>
                </div>
            </HashRouter>
            <div className="tablecloth"></div>
        </div>
    );
}
