import React from 'react';
import { Box, ListItem, List } from "@material-ui/core";
import { Link } from "react-router-dom";
// @material-ui/core components
import { Avatar } from "@material-ui/core";
// @material-ui/icons components
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LogoutIcon from '@mui/icons-material/Logout';
// core components styling
import { makeStyles } from "@material-ui/core/styles";
import componentStyles from "../../../assets/material-ui-style/componenets/auth-navbar";
const useStyles = makeStyles(componentStyles);

const LogedInLinksNav = (props) => {
    const classes = useStyles();
    const { user } = props.auth;

    return (
        <Box
            display="flex"
            alignItems="center"
            width="auto"
            component={List}
            className={classes.flexDirectionColumn}
        >
            <ListItem
                component={Link}
                to="/home"
                onClick={props.handleMenuClose}
                classes={{
                    root: classes.listItemRoot,
                }}
            >
                <Box
                    component={Dashboard}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    marginRight=".5rem!important"
                />
                Dashboard
            </ListItem>
            <ListItem
                component={Link}
                to="/auth/logout"
                onClick={props.handleMenuClose}
                classes={{
                    root: classes.listItemRoot,
                }}
            >
                <Box
                    component={LogoutIcon}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    marginRight=".5rem!important"
                />
                Logout
            </ListItem>
            <ListItem
                component={Link}
                to="/user/profile"
                onClick={props.handleMenuClose}
                classes={{
                    root: classes.listItemRoot,
                }}
            >
                <Avatar
                    alt="avatar"
                    src="/avatar.png"
                    sx={{ width: 56, height: 56 }}
                    className={classes.spacing}
                />


                {/* <Box
                    component={Person}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    marginRight=".5rem!important"
                /> */}
                {/* profole */}
                {user.user}
                {/* {props.auth.user} */}
            </ListItem>
        </Box>
    );
}

export default LogedInLinksNav;