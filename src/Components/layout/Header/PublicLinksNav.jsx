import React from 'react';
import { Box, ListItem, List } from "@material-ui/core";
import { Link } from "react-router-dom";

import AccountCircle from "@material-ui/icons/AccountCircle";
import Dashboard from "@material-ui/icons/Dashboard";
import VpnKey from "@material-ui/icons/VpnKey";

// core components styling
import { makeStyles } from "@material-ui/core/styles";
import componentStyles from "../../../assets/material-ui-style/componenets/auth-navbar";
const useStyles = makeStyles(componentStyles);

const PublicLinksNav = (props) => {
    const classes = useStyles();

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
                to="/"
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
                to="/auth/register"
                onClick={props.handleMenuClose}
                classes={{
                    root: classes.listItemRoot,
                }}
            >
                <Box
                    component={AccountCircle}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    marginRight=".5rem!important"
                />
                Register
            </ListItem>
            <ListItem
                component={Link}
                to="/auth/login"
                onClick={props.handleMenuClose}
                classes={{
                    root: classes.listItemRoot,
                }}
            >
                <Box
                    component={VpnKey}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    marginRight=".5rem!important"
                />
                Login
            </ListItem>
        </Box>
    );
}

export default PublicLinksNav;