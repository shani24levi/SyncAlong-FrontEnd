import React from 'react';
import "./txt.css";

function CoolTextH1(props) {
    return (
        <div class="text-effect">
            <h1 class="neon" data-text="GoSnippets" contenteditable>GoSNippets</h1>
            <div class="gradient"></div>
            <div class="spotlight"></div>
        </div>
    );
}

export default CoolTextH1;