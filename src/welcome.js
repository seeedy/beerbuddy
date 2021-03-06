import React from 'react';
import Registration from './registration';
import Login from './login';
import { Link, HashRouter, Route } from 'react-router-dom';
import Favicon from 'react-favicon';


export default function Welcome() {

    let logoStyle = {
        color: "gold",
        fontSize: "80px",
        padding: "20px",
        margin: "20px auto",
        fontWeight: 800,
        textAlign: "center",
    };
    return (

        <div className="wrapper">

            <Favicon url="/img/pint_icon.png" />

            <h1>Welcome to</h1>
            <h1 style={logoStyle}>
                <i className="far fa-heart"></i>
                <i className="fas fa-beer"></i>
            BeerBuddy
            </h1>
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
