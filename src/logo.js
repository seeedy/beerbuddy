import React from 'react';

export default function Logo() {

    let logoStyle = {
        color: "gold",
        fontSize: "3rem",
        fontFamily: "Helvetica",
        border: "10px solid gold",
        padding: "10px",
        margin: "10px",
        fontWeight: 300,
        width: "20%"
    };

    return (
        <div style={logoStyle}>Beer Lovers</div>
    );
}
