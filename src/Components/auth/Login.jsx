import React, { useState, useEffect, useRef } from 'react';
import PropTypes from "prop-types";
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import { loginUser } from '../../Store/actions/authAction';
import isEmpty from '../../validation/isEmpty';


import { makeStyles } from "@material-ui/core/styles";
import styles from "../../assets/material-ui-style/componenets/authStyle";
const useStyles = makeStyles(styles);

const Login = (props) => {
    const styles = useStyles();
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [errors, setErorrs] = useState({});

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }

    const userRef = useRef(null);
    const passRef = useRef(null);
    const submitRef = useRef(null);

    const emailList = [".com", ".co.il", ".org", ".co.uk"];

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    // useEffect(() => {
    //     let errors = {};
    //     if (props.errors.message === 'user not found') {
    //         errors["email"] = "* Email not found";
    //     }
    //     if (props.errors.message === 'Password does not match') {
    //         errors["pass"] = "*Password does not match";
    //     }
    //     setErorrs(errors);
    //     return;
    // }, [props.errors, props.auth.user])

    //for prassing "Enter" after fill the input 
    // and it contiue to the next input
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
        console.log('slslslslsl');

        // chack requierd elements
        let errors = {};
        if (!user) errors["user"] = "*UserName\Email is requiered";
        if (!pass) errors["pass"] = "*Password is requiered";
        console.log(isEmpty(errors));
        if (!isEmpty(errors)) {
            setErorrs(errors);
            return;
        }

        console.log(errors);

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
        console.log('chack submiting ');
        props.loginUser(data);
    }

    // console.log(props.auth);

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField
                    inputRef={userRef}
                    onKeyDown={firstKeyDown}
                    onChange={(event) => { setUser(event.target.value) }}
                    label='Username or Email' placeholder='Enter username\email' fullWidth required />
                <TextField
                    inputRef={passRef}
                    onKeyDown={secKeyDown}
                    onChange={(event) => { setPass(event.target.value) }}
                    label='Password' placeholder='Enter password' type='password' fullWidth required />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                <Button ref={submitRef} onKeyDown={submitKeyDown} onClick={onsubmit} type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
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
            </Paper>
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
