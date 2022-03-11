import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
    AppBar, Box, Container, Divider, Hidden, IconButton, ListItem, Menu, Toolbar
} from "@material-ui/core";
// @material-ui/icons components
import Clear from "@material-ui/icons/Clear";
import MenuIcon from "@material-ui/icons/Menu";
//link component
import PublicLinksNav from './PublicLinksNav'
import LogedInLinksNav from './LogedInLinksNav'
//redux 
import { connect } from 'react-redux';
// core components styling
import componentStyles from "../../../../assets/material-ui-style/componenets/auth-navbar";
const useStyles = makeStyles(componentStyles);


const NavBar = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = "responsive-menu-id";

    return (
        <>
            <AppBar position="relative" color="transparent" elevation={0}>
                <Toolbar>
                    <Container
                        display="flex!important"
                        justifyContent="space-between"
                        alignItems="center"
                        marginTop=".75rem"
                        component={Box}
                        maxWidth="xl"
                    >
                        <ListItem
                            component={Link}
                            to="/home"
                        >
                            <Box
                                alt="..."
                                height="90px"
                                component="img"
                                className={classes.headerImg}
                                src={"/logo3.png"}
                            // src={require("./../../../../assets/img/logo3.png").default}
                            />
                        </ListItem>
                        <Hidden lgUp implementation="css">
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={handleMenuOpen}
                                aria-controls={menuId}
                                aria-haspopup="true"
                            >
                                <Box
                                    component={MenuIcon}
                                    color={theme.palette.grey[100]}
                                    width="2rem!important"
                                    height="2rem!important"
                                />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                id={menuId}
                                keepMounted
                                transformOrigin={{ vertical: "top", horizontal: "right" }}
                                open={isMenuOpen}
                                onClose={handleMenuClose}
                                classes={{ paper: classes.menuPaper }}
                            >
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    paddingLeft="1.25rem"
                                    paddingRight="1.25rem"
                                    paddingBottom="1rem"
                                    className={classes.outlineNone}
                                >
                                    <Box
                                        alt="..."
                                        height="76px"
                                        component="img"
                                        className={classes.headerImg}
                                        src={"/logo-dark3.png"}
                                    // src={require("./../../../../assets/img/logo-dark3.png").default}
                                    />
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={handleMenuClose}
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                    >
                                        <Box
                                            component={Clear}
                                            width="2rem!important"
                                            height="2rem!important"
                                        />
                                    </IconButton>
                                </Box>
                                <Box
                                    component={Divider}
                                    marginBottom="1rem!important"
                                    marginLeft="1.25rem!important"
                                    marginRight="1.25rem!important"
                                />
                                {props.auth.loggedIn ? <LogedInLinksNav auth={props.auth} handleMenuClose={handleMenuClose} /> : <PublicLinksNav handleMenuClose={handleMenuClose} />}
                            </Menu>
                        </Hidden>
                        <Hidden mdDown implementation="css">
                            {props.auth.loggedIn ? <LogedInLinksNav auth={props.auth} handleMenuClose={handleMenuClose} /> : <PublicLinksNav handleMenuClose={handleMenuClose} />}
                        </Hidden>
                    </Container>
                </Toolbar>
            </AppBar>
        </>
    );
}


NavBar.propTypes = {
    auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
    };
}

export default connect(mapStateToProps, null)(NavBar);