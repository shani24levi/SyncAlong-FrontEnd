import React from 'react';
import { Link } from "react-router-dom";
import {
    Container, Button, Typography, Box, Grid, Avatar
} from "@material-ui/core";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles";
import componentStyles from "../../../assets/material-ui-style/componenets/profile";
import { width } from '@mui/system';
const useStyles = makeStyles(componentStyles);

function ViewProfileHeader(props) {
    const user = useSelector(state => state.auth.user);
    const classes = useStyles();

    return (
        <Box sx={{ width: '100%' }} className={classes.haederView}>
            <Container>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8} md={8} >
                        <Grid container spacing={2} >
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" gutterBottom >
                                    {user.user}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Typography variant="subtitle1">
                                    You will be transferred to your profile in a few seconds
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} alignItems='center'>
                        <Avatar
                            alt="avatar"
                            src={user.avatar}
                            className={classes.largelarge}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default ViewProfileHeader;