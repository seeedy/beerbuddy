import React from 'react';

export default function Logo() {

    let logoStyle = {
        color: "royalblue",
        fontSize: "2rem",
        fontFamily: "Helvetica",
        border: "5px solid royalblue",
        padding: "10px",
        margin: "10px",
        fontWeight: 300,
        float: "left"
    };

    return (
        <div className="logo" style={logoStyle}>Beer Lovers</div>
    );
}
