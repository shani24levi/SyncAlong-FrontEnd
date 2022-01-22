import React from 'react';
import { Box, ListItem, List } from "@material-ui/core";
import { Link } from "react-router-dom";

import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LogoutIcon from '@mui/icons-material/Logout';

// core components styling
import { makeStyles } from "@material-ui/core/styles";
import componentStyles from "../../../assets/material-ui-style/componenets/auth-navbar";
const useStyles = makeStyles(componentStyles);

const LogedInLinksNav = (props) => {
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
                to="/admin/dashboard"
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
                to="/admin/user-profile"
                onClick={props.handleMenuClose}
                classes={{
                    root: classes.listItemRoot,
                }}
            >
                <Box
                    component={Person}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    marginRight=".5rem!important"
                />
                Profile
            </ListItem>
        </Box>
    );
}

export default LogedInLinksNav;