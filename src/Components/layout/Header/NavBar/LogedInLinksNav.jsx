import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../../Store/actions/authAction';
import { Link } from "react-router-dom";
import { Box, ListItem, List } from "@material-ui/core";
// @material-ui/core components
import { Avatar } from "@material-ui/core";
import {
    Button, MenuItem, Fade, Menu
} from "@material-ui/core";
// @material-ui/icons components
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LogoutIcon from '@mui/icons-material/Logout';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NotificationsIcon from '@mui/icons-material/Notifications';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

// core components styling
import { makeStyles } from "@material-ui/core/styles";
import componentStyles from "../../../../assets/material-ui-style/componenets/auth-navbar";
import { capitalize } from '../../../../helpers';
const useStyles = makeStyles(componentStyles);

const LogedInLinksNav = (props) => {
    const navigate = useNavigate();
    const classes = useStyles();
    const user = props.auth.user;
    const profile = useSelector(state => state.profile.profile);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogoutClick = (e) => {
        e.preventDefault();
        //remove user form list in the server
        let userId = user._id;
        userId && props.socket?.emit('disconnectLogout', userId);
        //clearing all starts in the app
        dispatch(logoutUser())
        props.handleMenuClose();
    }

    return (
        <Box
            display="flex"
            alignItems="center"
            width="auto"
            component={List}
            className={classes.flexDirectionColumn}
        >
            <div>
                <Menu
                    id="fade-menu"
                    MenuListProps={{
                        'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
            </div>

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
                Home
            </ListItem>
            <ListItem
                component={Link}
                to={profile ? "/schedule/meetings" : "#"}
                onClick={props.handleMenuClose}
                classes={{
                    root: classes.listItemRoot,
                }}
            >
                <Box
                    component={CalendarTodayIcon}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    marginRight=".5rem!important"
                />
                Schedule
            </ListItem>
            <ListItem
                component={Link}
                to={profile ? "/meetings" : "#"}
                onClick={props.handleMenuClose}
                classes={{
                    root: classes.listItemRoot,
                }}
            >
                <Box
                    component={NotificationsIcon}
                    width="1.25rem!important"
                    height="1.25rem!important"
                    marginRight=".5rem!important"
                />
                Meetings
            </ListItem>
            <ListItem
                component={Link}
                to="/profile"
                onClick={props.handleMenuClose}
                classes={{
                    root: classes.listItemRoot,
                }}
            >
                <Avatar
                    alt="avatar"
                    src={user.avatar}
                    sx={{ width: 56, height: 56 }}
                    className={classes.spacing}
                />
                {capitalize(user.name)}
            </ListItem>
            <ListItem
                component={Link}
                to="auth/login"
                onClick={onLogoutClick}
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
        </Box>
    );
}

export default LogedInLinksNav;