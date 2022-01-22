import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
    Grid, Paper, Avatar, FilledInput, FormControl, TextField, Button, Typography, Link,
    Card, CardContent, CardHeader, InputAdornment, Box, FormControlLabel, Checkbox,
} from '@material-ui/core'
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//childs commponents
import CircelsHeader from '../layout/Header/CircelsHeader';
import TitleHeader from '../layout/Header/TitleHeader';
//validations
import isEmpty from '../../validation/isEmpty';
//redux 
import { connect } from 'react-redux';
import { registerUser } from '../../Store/actions/authAction';
// core styling components
import componentStyles from "../../assets/material-ui-style/componenets/register";
const useStyles = makeStyles(componentStyles);


const Register = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const [user, setUser] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [changed, setChaged] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErorrs] = useState({});

    useEffect(() => {
        let errors = {};
        if (props.errors === 'Duplicate field value entered of email') {
            errors["email"] = "*email already exists";
        }
        if (props.errors === 'Duplicate field value entered of usename') {
            errors["nickname"] = "*nick name already exists";
        }
        if (!isEmpty(errors))
            setErorrs(errors);
        return;
    }, [props.errors])

    const onsubmit = e => {
        e.preventDefault();
        setSubmitted(true);
        setChaged(false);
        console.log('im here');

        if (user && nickname && email && pass) {
            if (pass.length < 6 || nickname.length < 2 || user.length < 2 || !(/\S+@\S+\.\S+/.test(email))) return;
            let data = { user, username: nickname, email, password: pass } //named as in servre side
            props.registerUser(data);
        }
    }

    return (
        <>
            <Grid className="index-page">
                <CircelsHeader />
                <TitleHeader
                    title='Welcome To SyncAlong!'
                    description='Joint physical activity and movement synchronized with positive energies.'
                />

                <Paper elevation={10} className={classes.paperStyle2}>
                    <Grid align='center'>
                        <Avatar className={classes.avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2>Sign Up</h2>
                    </Grid>

                    <Grid item>
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
                                <Box
                                    color={theme.palette.grey[600]}
                                    textAlign="center"
                                    marginBottom="1.5rem"
                                    marginTop=".5rem"
                                    fontSize="1rem"
                                >
                                    <Box fontSize="80%" fontWeight="400" component="small">
                                        Or sign up with credentials
                                    </Box>
                                </Box>
                                <Box component="form" noValidate onSubmit={onsubmit}>
                                    <FormControl
                                        variant="filled"
                                        onChange={(event) => { setUser(event.target.value); setChaged(true); }}
                                        component={Box}
                                        width="100%"
                                        marginBottom="1.5rem!important"
                                        error={errors.user || (submitted && !user)}
                                    >
                                        <FilledInput
                                            autoComplete="off"
                                            type="text"
                                            placeholder="Name"
                                            required
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <AccountCircleIcon />
                                                </InputAdornment>
                                            }
                                        />
                                        {submitted && !user && <Typography color="error" variant="body2"> *name is required</Typography>}
                                        {submitted && user && user.length < 2 && <Typography color="error" variant="body2"> *name is too short</Typography>}
                                        {submitted && errors["user"] && !changed && <Typography color="error" variant="body2"> {errors["user"]}</Typography>}
                                    </FormControl>
                                    <FormControl
                                        variant="filled"
                                        onChange={(event) => { setNickname(event.target.value); setChaged(true); }}
                                        component={Box}
                                        width="100%"
                                        marginBottom="1.5rem!important"
                                        error={errors.nickname || (submitted && !nickname)}
                                    >
                                        <FilledInput
                                            autoComplete="off"
                                            type="text"
                                            placeholder="Nick name"
                                            required
                                            minRows={2}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            }
                                        />
                                        {submitted && !nickname && <Typography color="error" variant="body2"> *nickname is required</Typography>}
                                        {submitted && nickname && nickname.length < 2 && <Typography color="error" variant="body2"> *nickname too short</Typography>}
                                        {errors["nickname"] && !changed && <Typography color="error" variant="body2"> {errors["nickname"]}</Typography>}
                                    </FormControl>
                                    <FormControl
                                        variant="filled"
                                        onChange={(event) => { setEmail(event.target.value); setChaged(true); }}
                                        component={Box}
                                        width="100%"
                                        marginBottom="1.5rem!important"
                                    >
                                        <FilledInput
                                            autoComplete="off"
                                            type="email"
                                            placeholder="Email"
                                            required
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <Email />
                                                </InputAdornment>
                                            }
                                        />
                                        {submitted && !email && <Typography color="error" variant="body2"> *email is required</Typography>}
                                        {submitted && email && !(/\S+@\S+\.\S+/.test(email)) && <Typography color="error" variant="body2"> *email is not valid</Typography>}
                                        {errors["email"] && !changed && <Typography color="error" variant="body2"> {errors["email"]}</Typography>}
                                    </FormControl>
                                    <FormControl
                                        variant="filled"
                                        onChange={(event) => { setPass(event.target.value); setChaged(true); }}
                                        component={Box}
                                        width="100%"
                                        marginBottom="1.5rem!important"
                                    >
                                        <FilledInput
                                            autoComplete="on"
                                            type="password"
                                            placeholder="Password"
                                            required
                                            minRows={6}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <Lock />
                                                </InputAdornment>
                                            }
                                        />
                                        {submitted && !pass && <Typography color="error" variant="body2"> *pass is required</Typography>}
                                        {submitted && pass && pass.length < 6 && <Typography color="error" variant="body2"> *pass must be 6 digits long</Typography>}
                                        {errors["pass"] && !changed && <Typography color="error" variant="body2"> {errors["pass"]}</Typography>}
                                    </FormControl>

                                    <FormControlLabel
                                        value="end"
                                        control={<Checkbox color="primary" />}
                                        label={
                                            <>
                                                I agree with the{" "}
                                                <Box
                                                    color={theme.palette.primary.main}
                                                    component="a"
                                                    textDecoration="none"
                                                >
                                                    Privacy Policy
                                                </Box>
                                            </>
                                        }
                                        labelPlacement="end"
                                        classes={{
                                            root: classes.formControlLabelRoot,
                                            label: classes.formControlLabelLabel,
                                        }}
                                    />
                                    <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
                                        <Button type="submit" color="primary" variant="contained">
                                            Create account
                                        </Button>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Paper>
            </Grid>
        </>
    );
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
function mapStateToProps(state) {
    return {
        auth: state.auth,
        errors: state.errors,
    };
}
export default connect(mapStateToProps, { registerUser })(Register);

