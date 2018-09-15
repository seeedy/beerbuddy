import React from 'react';

export default function Logo() {

    let logoStyle = {
        color: "gold",
        fontSize: "2rem",
        border: "5px solid gold",
        padding: "12px",
        marginLeft: "10px",
        fontWeight: 300,
        float: "left"
    };

    return (
        <div className="logo" style={logoStyle}>
            <i className="fas fa-beer"></i>
        </div>
    );
}
