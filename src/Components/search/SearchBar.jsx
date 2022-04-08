import React, { useState } from 'react';
import { styled } from '@mui/material';

const Wrapper = styled('div')`
margin: 20px;
text-align: center;
background: #191e38;

input {
    width: 75%;
    color: #52629D !important;
    font-family: "Open Sans", sans-serif;
    font-weight: 300;
    /*padding: 30px 48px 30px 22px;*/
    background: none;
    border: 0;
    font-size: 36px;
    height: auto;
    line-height: 48px;
    caret-color: #fff;
}
`;

function SearchBar(props) {
    const [term, setTerm] = useState('');
    return (
        <Wrapper className="search-bar">
            <input
                placeholder="Search"
                value={term}
                onChange={event => setTerm(event.target.value)} />
        </Wrapper>
    );
}

export default SearchBar;