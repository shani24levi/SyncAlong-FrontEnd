import React from 'react';
import {
    Card,
    CardMedia,
    CardHeader,
    CardActions,
    CardContent,
    Typography,
    Button,
    makeStyles,
    Avatar, Box,
    Grid
} from "@material-ui/core";

import PhoneIcon from "@material-ui/icons/Phone";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import LocationOnIcon from "@material-ui/icons/LocationOn";

import { useSelector, useDispatch } from 'react-redux';
// core components style
import componentStyles from "../../assets/material-ui-style/componenets/profile";
const useStyles = makeStyles(componentStyles);


const UserCard = (props) => {
    const auth = useSelector(state => state.auth);
    const profile = useSelector(state => state.profile.profile);
    const classes = useStyles();

    return (
        <Grid
            item
            xs={12}
            sm={4}
            md={4}
        >
            <Card
                className={classes.card}
            >
                <CardMedia align="center">
                    <div className={classes.brand} ></div>
                    <Avatar
                        alt="avatar"
                        src={auth.user.avatar}
                        className={classes.large}
                    />
                </CardMedia>
                <CardContent className={classes.cardContent}>
                    <Typography
                        className={classes.text}
                        // color="textSecondary"
                        variant="h6"
                        align="center"
                    >
                        {auth.user.user}
                    </Typography>
                    <Typography
                        className={classes.text}
                        // color="textSecondary"
                        variant="subtitle1"
                        align="center"
                    >
                        <AlternateEmailIcon className={classes.avatar} fontSize="small" />
                        {auth.user.email}
                    </Typography>{" "}
                    <Typography
                        className={classes.text}
                        // color="textSecondary"
                        variant="subtitle1"
                        align="center"
                    >
                        <PhoneIcon className={classes.avatar} fontSize="small" />
                        054.....
                    </Typography>{" "}
                    <Typography
                        className={classes.text}
                        // color="textSecondary"
                        variant="subtitle1"
                        align="center"
                    >
                        <LocationOnIcon className={classes.avatar} fontSize="small" />
                        ciry
                    </Typography>{" "}
                </CardContent>
            </Card>
        </Grid>
    );
}

export default UserCard;