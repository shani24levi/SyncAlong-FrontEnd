import React from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from '@material-ui/core/styles';

import './style.css'

const useStyles = makeStyles((theme) => ({
    box: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        "&:hover": {
            width: "350px",
            background: "#272133",
            borderRadius: "10px",
        },
    },
    input: {
        padding: "10px",
        width: "80px",
        height: "80px",
        background: "none",
        border: "4px solid #e14eca",
        borderRadius: "50px",
        boxSizing: "border-box",
        fontSize: "26px",
        color: "#e14eca",
        outline: "none",
        transition: ".5s",
        fontSize: 'medium'
    },
    i: {
        position: "absolute",
        top: "21.7%",
        right: "435px",
        transform: "translate(-50%,-50%)",
        fontSize: "26px",
        color: "#e14eca",
        transition: ".2s",
        "&:hover": {
            opacity: 0,
            zindex: -1,
            top: "21.7%",
            right: "300px",


        },
    }
}));

function SearchAnimation({ onSearch }) {
    const classes = useStyles();
    const [search, setSearch] = React.useState('');

    const onSearchInputChange = ({ target: { value } }) => {
        console.log(value);
        setSearch(value);
        onSearch(value);
    }

    return (
        <div className="box">
            <form name="search">
                <input className={classes.input}
                    type="text" placeholder="Search" value={search} onChange={onSearchInputChange}
                />
            </form>
            {/* <SearchIcon className={classes.i} /> */}
        </div>
    );
}

export default SearchAnimation;