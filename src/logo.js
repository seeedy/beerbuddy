import React from 'react';

export default function Logo() {

    let logoStyle = {
        color: "gold",
        fontSize: "2rem",
        padding: "5px",
        marginLeft: "50px",
        fontWeight: 300,
        float: "left"
    };

    return (
        <div className="logo" style={logoStyle}>
            <i className="far fa-heart"></i>
            <i className="fas fa-beer"></i>
        </div>
    );
}
