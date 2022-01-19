import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import { useNavigate } from 'react-router-dom';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
    Grid, Paper, Avatar, TextField, Button, Typography, Link,
    Card, CardContent, CardHeader, Box, FormControlLabel, Checkbox,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CircelsHeader from '../layout/Header/CircelsHeader';
import TitleHeader from '../layout/Header/TitleHeader';
//validations
import isEmpty from '../../validation/isEmpty';

//redux 
import { connect } from 'react-redux';
import { loginUser } from '../../Store/actions/authAction';

//styling
import componentStyles from "../../assets/material-ui-style/componenets/register";
import buttonsStyles from "../../assets/theme/buttons";
const useStyles = makeStyles(componentStyles);
const buttonStyle = makeStyles(buttonsStyles);

const Login = (props) => {
    const classes = useStyles();
    const btnClasses = buttonStyle();
    const theme = useTheme();

    const navigate = useNavigate();
    // console.log('login name', window.location.pathname);

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErorrs] = useState({});

    const paperStyle = { padding: 20, margin: "20px auto", maxWidth: 500, position: "relative", background: "rgb(255 237 255 / 68%)" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    const userRef = useRef(null);
    const passRef = useRef(null);
    const submitRef = useRef(null);

    const emailList = [".com", ".co.il", ".org", ".co.uk"];

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        let errors = {};
        if (props.errors === 'user not found') {
            errors["user"] = "*User not found";
        }
        if (props.errors === 'Password does not match') {
            errors["pass"] = "*Password does not match";
        }
        setErorrs(errors);
        return;
    }, [props.errors])

    // Prassing "Enter" after fill the input and it contiue to the next input
    const firstKeyDown = e => {
        if (e != null && e.key === "Enter")
            passRef.current?.focus();
    }
    const secKeyDown = e => {
        if (e != null && e.key === "Enter")
            submitRef.current?.focus();
    }
    const submitKeyDown = e => {
        if (e.key === "Enter")
            onsubmit(e);
    }

    const onsubmit = e => {
        e.preventDefault();
        setSubmitted(true);

        if (user && pass) {
            //chaks type of element
            let isEmail = false;
            emailList.map(email_type => {
                if (user.includes(email_type)) {
                    console.log(email_type);
                    console.log(user.includes(email_type));
                    isEmail = true;
                }
            })
            console.log(isEmail);

            // set object data
            let data = { password: pass }
            //set object data with email or username as requsted in back-end
            if (isEmail) data.email = user;
            else data.username = user;

            console.log('data', data);
            props.loginUser(data);
        }
    }

    return (
        <Grid className="index-page">
            <CircelsHeader />
            <TitleHeader
                title='Welcome To SyncAlong!'
                description='Joint physical activity and movement synchronized with positive energies.'
            />

            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2>Sign In</h2>
                    </Grid>
                    <Card classes={{ root: classes.cardRoot }}>
                        <CardHeader
                            className={classes.cardHeader}
                            title={
                                <Box
                                    fontSize="80%"
                                    fontWeight="400"
                                    component="small"
                                    color={theme.palette.grey[600]}
                                >
                                    Sign up with
                                </Box>
                            }
                            titleTypographyProps={{
                                component: Box,
                                textAlign: "center",
                                marginBottom: "1rem!important",
                                marginTop: ".5rem!important",
                                fontSize: "1rem!important",
                            }}
                            subheader={
                                <Box textAlign="center">
                                    <Box
                                        component={Button}
                                        variant="contained"
                                        marginRight="2rem!important"
                                        classes={{ root: classes.buttonRoot }}
                                    >
                                        <Box component="span" marginRight="4px">
                                            <Box
                                                alt="..."
                                                component="img"
                                                width="20px"
                                                className={classes.buttonImg}
                                                src=
                                                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/1200px-Facebook_icon_2013.svg.png"
                                            ></Box>
                                        </Box>
                                        <Box component="span" marginLeft=".75rem">
                                            FaceBook
                                        </Box>
                                    </Box>
                                    <Button
                                        variant="contained"
                                        classes={{ root: classes.buttonRoot }}
                                    >
                                        <Box component="span" marginRight="4px">
                                            <Box
                                                alt="..."
                                                component="img"
                                                width="20px"
                                                className={classes.buttonImg}
                                                src=
                                                "https://freesvg.org/img/1534129544.png"

                                            ></Box>
                                        </Box>
                                        <Box component="span" marginLeft=".75rem">
                                            Google
                                        </Box>
                                    </Button>
                                </Box>
                            }
                        ></CardHeader>
                        <CardContent classes={{ root: classes.cardContent }}>
                            <Box component="form" noValidate onSubmit={onsubmit}>
                                <TextField
                                    name="email"
                                    inputRef={userRef}
                                    onKeyDown={firstKeyDown}
                                    onChange={(event) => { setUser(event.target.value) }}
                                    autoComplete="on"
                                    label='Username or Email'
                                    placeholder='Enter username\email'
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                // color="gray"
                                />
                                {submitted && !user &&
                                    <Typography color="error" component="p"> *Username\Email is required</Typography>
                                }
                                {errors["user"] && <Typography color="error" component="p"> {errors["user"]}</Typography>}
                                <TextField
                                    inputRef={passRef}
                                    onKeyDown={secKeyDown}
                                    onChange={(event) => { setPass(event.target.value) }}
                                    autoComplete="current-password"
                                    label='Password' placeholder='Enter password' type='password' fullWidth required
                                />
                                {submitted && !pass &&
                                    <Typography color="error" component="p"> *Username\Email is required</Typography>
                                }
                                {errors["pass"] && <Typography color="error" component="p"> {errors["pass"]}</Typography>}
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Remember me"
                                />
                                <Button ref={submitRef} onKeyDown={submitKeyDown} type="submit" color='primary' variant="contained" style={btnstyle} fullWidth>Login</Button>
                                <Button className={btnClasses.purpleSimple} fullWidth>dkkdkd</Button>
                            </Box>

                            <Typography align='center'>
                                <Link href="#" >
                                    Forgot password ?
                                </Link>
                            </Typography>
                            <Typography align='center'> Do you have an account ?
                                <Link href="#" >
                                    Sign Up
                                </Link>
                            </Typography>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
        </Grid>
    );
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth,
        errors: state.errors,
    };
}

export default connect(mapStateToProps, { loginUser })(Login);