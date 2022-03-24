import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
    Grid, Paper, Avatar, TextField, Button, Typography, Link,
    Card, CardContent, CardHeader, Box, FormControlLabel, Checkbox,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import { Snackbar, Alert } from '@mui/material';
import { CircularProgress } from "@material-ui/core";
//childs commponents
import CircelsHeader from '../layout/Header/CircelsHeader';
import TitleHeader from '../layout/Header/TitleHeader';
//validations
import isEmpty from '../../validation/isEmpty';
//redux 
import { connect, useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../Store/actions/authAction';
//styling
import componentStyles from "../../assets/material-ui-style/componenets/register";
import buttonsStyles from "../../assets/theme/buttons";
import SuccessAlertBotomCenter from '../alrets/SuccessAlertBotomCenter';
const useStyles = makeStyles(componentStyles);
const buttonStyle = makeStyles(buttonsStyles);

const Login = (props) => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const classes = useStyles();
    const btnClasses = buttonStyle();
    const theme = useTheme();
    const navigate = useNavigate()

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [changed, setChaged] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErorrs] = useState({});
    const [alert, setAlert] = useState(false);
    const [open, setOpen] = React.useState(false);

    const userRef = useRef(null);
    const passRef = useRef(null);
    const submitRef = useRef(null);

    const emailList = [".com", ".co.il", ".org", ".co.uk"];

    useEffect(() => {
        // chack if user cames from login page 
        if (props.resisterd && props.alert) {
            setAlert(true);
        }
        //set up an alrat it user registered first 
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        if (!isEmpty(props.auth.user)) {
            navigate('/home')
        }

        let errors = {};
        if (props.errors === 'user not found') {
            errors["user"] = "*User not found";
        }
        if (props.errors === 'Password does not match') {
            errors["pass"] = "*Password does not match";
        }
        if (!isEmpty(errors))
            setErorrs(errors);
        return;
    }, [props.errors, props.auth.user])

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
        setChaged(false);

        if (user && pass) {
            //chaks type of element
            let isEmail = false;
            emailList.map(email_type => {
                if (user.includes(email_type)) {
                    isEmail = true;
                }
            })

            // set object data
            let data = { password: pass }
            //set object data with email or username as requsted in back-end
            if (isEmail) data.email = user;
            else data.username = user;
            props.loginUser(data);
        }
    }

    const handleClick = () => { setAlert(true); };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setAlert(false);
    };

    return (
        <Grid className="index-page">
            <CircelsHeader />
            <TitleHeader
                title='Welcome To SyncAlong!'
                description='Joint physical activity and movement synchronized with positive energies.'
            />

            {alert && <SuccessAlertBotomCenter title={props.alert.message} />}

            <Grid>
                <Paper elevation={10} className={classes.paperStyle2}>
                    <Grid align='center'>
                        <Avatar className={classes.avatarStyle}><LockOutlinedIcon /></Avatar>
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
                                    onChange={(event) => { setUser(event.target.value); setChaged(true); }}
                                    autoComplete="on"
                                    label='Username or email'
                                    placeholder='Enter username or email'
                                    fullWidth
                                    required
                                    margin="normal"
                                    variant="outlined"
                                    error={errors.user || (submitted && !user)}
                                />
                                {submitted && !user &&
                                    <Typography color="error" variant="body2" > *Username\Email is required</Typography>
                                }
                                {errors["user"] && !changed && <Typography color="error" variant="body2" > {errors["user"]}</Typography>}
                                <TextField
                                    inputRef={passRef}
                                    onKeyDown={secKeyDown}
                                    onChange={(event) => { setPass(event.target.value); setChaged(true); }}
                                    autoComplete="current-password"
                                    label='Password'
                                    placeholder='Enter password'
                                    type='password'
                                    fullWidth required
                                    margin="normal"
                                    variant="outlined"
                                    error={errors.pass || (submitted && !pass)}
                                    helperText={
                                        (submitted && !pass)
                                            ? <Typography color="error" variant="body2"> *Password is required</Typography>
                                            : errors["pass"] && !changed && <Typography color="error" variant="body2"> {errors["pass"]}</Typography>
                                    }
                                />
                                {/* {submitted && !pass &&
                                    <Typography color="error" variant="body2"> *Password is required</Typography>
                                } */}
                                {/* {errors["pass"] && !changed && <Typography color="error" variant="body2"> {errors["pass"]}</Typography>} */}
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="checkedB"
                                            color="primary"
                                        />
                                    }
                                    label="Remember me"
                                />
                                <Button ref={submitRef} onKeyDown={submitKeyDown} type="submit" color='primary' variant="contained" className={btnClasses.purpleDefult} fullWidth disabled={props.loading}>
                                    {props.loading ? (
                                        <CircularProgress color="secondary" size="20px" />
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                            </Box>
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
        loading: state.auth.loading,
        resisterd: state.auth.resisterd,
        alert: state.alert,
        errors: state.errors,
    };
}

export default connect(mapStateToProps, { loginUser })(Login);