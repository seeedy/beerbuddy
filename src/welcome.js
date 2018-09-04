import React from 'react';
import Registration from './registration';

export default function Welcome() {

    let logoStyle = {
        color: "gold",
        fontSize: "100px",
        fontFamily: "Helvetica",
        border: "10px solid gold",
        padding: "10px",
        margin: "10px",
        fontWeight: 300
    };
    return (

        <div className="wrapper">
            <h1>Welcome to</h1>
            <h1 style={logoStyle}>BEER LOVERS</h1>

            <Registration />
            <p>Already registered? <a href="/login">Login here!</a></p>
        </div>
    );
}
