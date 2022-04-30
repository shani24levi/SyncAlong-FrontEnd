import React, { useState } from 'react';
import { styled } from '@mui/material';

const Wrapper = styled('div')`
margin: 20px;
text-align: center;
background: #191e38;

input {
    width:100%;
    color: #52629D !important;
    font-family: "Open Sans", sans-serif;
    font-weight: 300;
    /*padding: 30px 48px 30px 22px;*/
    background: none;
    border: 0;
    font-size: 36px;
    height: auto;
    line-height: 48px;
    text-align: center;
}
`;

function SearchBar({ onSearch }) {
    const [search, setSearch] = React.useState('');
    const onSearchInputChange = ({ target: { value } }) => {
        console.log(value);
        setSearch(value);
        onSearch(value);
    }

    return (
        <Wrapper className="search-bar">
            <input
                placeholder="Search"
                value={search} onChange={onSearchInputChange} />
        </Wrapper>
    );
}

export default SearchBar;