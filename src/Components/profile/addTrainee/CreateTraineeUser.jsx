import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Grid, Paper, Avatar, FilledInput, FormControl, TextField, Button, Typography, Link,
    Card, CardContent, CardHeader, InputAdornment, Box, FormControlLabel, Checkbox,
} from '@material-ui/core'
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


function CreateTraineeUser({
    setFullName,
    fullname,
    setUserName,
    username,
    setEmail,
    email,
    setChaged,
    changed,
    submitted,
    setPass,
    pass,
    errors
}) {
    return (
        <Box component="form" noValidate >
            <FormControl
                variant="filled"
                onChange={(event) => { setFullName(event.target.value); setChaged(true); }}
                component={Box}
                width="100%"
                marginBottom="1.5rem!important"
                error={errors.fullname || (submitted && !fullname)}
            >
                <FilledInput
                    autoComplete="off"
                    type="text"
                    placeholder="Full Name"
                    required
                    startAdornment={
                        <InputAdornment position="start">
                            <AccountCircleIcon />
                        </InputAdornment>
                    }
                />
                {submitted && errors["fullname"] && !changed && <Typography color="error" variant="body2"> {errors["fullname"]}</Typography>}
            </FormControl>
            <FormControl
                variant="filled"
                onChange={(event) => { setUserName(event.target.value); setChaged(true); }}
                component={Box}
                width="100%"
                marginBottom="1.5rem!important"
                error={errors.username || (submitted && !username)}
            >
                <FilledInput
                    autoComplete="off"
                    type="text"
                    placeholder="User Name"
                    required
                    minRows={2}
                    startAdornment={
                        <InputAdornment position="start">
                            <PersonIcon />
                        </InputAdornment>
                    }
                />
                {errors["username"] && !changed && <Typography color="error" variant="body2"> {errors["username"]}</Typography>}
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
                    value={email}
                    required
                    startAdornment={
                        <InputAdornment position="start">
                            <Email />
                        </InputAdornment>
                    }
                />
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
                {submitted && pass && pass.length < 6 && <Typography color="error" variant="body2"> *pass must be 6 digits long</Typography>}
                {errors["pass"] && !changed && <Typography color="error" variant="body2"> {errors["pass"]}</Typography>}
            </FormControl>
        </Box>
    );
}

export default CreateTraineeUser;