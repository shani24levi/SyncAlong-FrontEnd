import React from 'react';
import { Link } from "react-router-dom";
import {
    Container, Button, Typography, Box, Grid, Avatar
} from "@material-ui/core";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useSelector } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles";
import componentStyles from "../../../assets/material-ui-style/componenets/profile";
const useStyles = makeStyles(componentStyles);

function ViewProfileHeader(props) {
    const user = useSelector(state => state.auth.user);
    const classes = useStyles();

    return (
        <Box sx={{ width: '100%' }} className={classes.haederView}>
            <Container>
                <Grid container spacing={3} alignItems='center'>
                    <Grid item xs={12} sm={8} md={8} >
                        <Grid container spacing={2} >
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                '& > *': {
                                    m: 1,
                                },
                            }}
                            >
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="h6" gutterBottom >
                                        User name: {user.user}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="h6" gutterBottom >
                                        full name: {user.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="h6" gutterBottom >
                                        email:   {user.email}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="h6" gutterBottom >
                                        role: {user.role}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Typography variant="subtitle1">
                                        You User Data
                                    </Typography>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={4} sm={4} md={4} >
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