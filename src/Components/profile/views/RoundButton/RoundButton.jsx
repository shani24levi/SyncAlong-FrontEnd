import React from 'react';
import "./style.css";

function handleClick(e) {
    const navId = e.currentTarget.getAttribute("target");
    document.getElementById(navId).click();
}
function RoundButton(props) {
    return (
        <div className="button" onClick={handleClick} target={props.target}>
            {props.text}
        </div>
    );
}

export default RoundButton;