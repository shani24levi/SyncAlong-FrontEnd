import React from 'react';
import {
    Card,
    CardMedia,
    CardHeader,
    CardActions,
    CardContent,
    Typography,
    Button,
    makeStyles,
    Avatar,
    Grid,
} from "@material-ui/core";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useSelector, useDispatch } from 'react-redux';
// core components style
import componentStyles from "../../assets/material-ui-style/componenets/profile";
import buttonsStyles from "../../assets/theme/buttons";
const useStyles = makeStyles(componentStyles);
const buttonStyle = makeStyles(buttonsStyles);


function ProfileForm(props) {
    const classes = useStyles();
    const btnClasses = buttonStyle();
    const user = useSelector(state => state.auth.user);

    return (
        <Grid
            item
            xs={12}
            sm={8}
            md={8}
        >
            <Card
                className={classes.card}
            >
                <CardContent >
                    <Typography component="h1" variant="h5" className={classes.text} >
                        Craete Profile
                    </Typography>
                    <Box
                        sx={{ mt: 3, m: 1 }}
                        component="form"
                        noValidate
                        autoComplete="off"
                        onSubmit={onsubmit}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={4}>
                                <TextField
                                    autoComplete="given-name"
                                    name="FullName"
                                    color="secondary"
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <TextField
                                    required
                                    fullWidth
                                    color="secondary"
                                    id="UserName"
                                    label="UserName"
                                    name="UserName"
                                    defaultValue={user.user}
                                // autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    color="secondary"
                                    id="lastName"
                                    label="Email"
                                    name="Email"
                                    defaultValue={user.email} />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    color="secondary"
                                    name="Address"
                                    label="Address"
                                    id="Address"
                                />
                            </Grid>
                            <Grid item xs={6} sm={4}>
                                <TextField
                                    color="secondary"
                                    id="City"
                                    label="City"
                                    name="City"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={6} sm={4} >
                                <TextField
                                    fullWidth
                                    color="secondary"
                                    id="lastName"
                                    label="Contry"
                                    name="Contry"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    color="secondary"
                                    id="Age"
                                    label="Number"
                                    type="number"
                                    name="Age"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    multiline={true}
                                    rows={4}
                                    color="secondary"
                                    id="about"
                                    label="About Me"
                                    name="about"
                                />
                            </Grid>
                        </Grid>

                        <Button sx={{ m: 3, width: '30ch' }} className={btnClasses.purpleDefult}  >
                            Next
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default ProfileForm;