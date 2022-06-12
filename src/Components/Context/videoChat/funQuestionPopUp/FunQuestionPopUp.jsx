import React from 'react';
import "./style.css";

function FunQuestionPopUp({ name = 'Hi' }) {
    return (
        <>
            <div>
                <div className="stars-01"></div>
                <div className="stars-02"></div>
                <div className="stars-03"></div>
                <div className="stars-04"></div>
            </div>

            <div className="text">
                <span>{name}, </span>
                <span>ARE </span>
                <span>YOU </span>
                <span>READY </span>
                <span> ?</span>
            </div>
        </>
    );
}

export default FunQuestionPopUp;