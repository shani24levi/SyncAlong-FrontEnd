import React from 'react';
import {
    Grid, Paper, Avatar, TextField, Button, Typography, Link, makeStyles,
    Card, CardContent, CardHeader, Box, FormControlLabel, Checkbox,
} from '@material-ui/core'

import buttonsStyles from "../../../../assets/theme/buttons";
import CardContiner from '../../../card/CardContiner';
const buttonStyle = makeStyles(buttonsStyles);

function About({ profile, setModalIsOpen }) {
    const btnClasses = buttonStyle();

    return (
        <div>
            <CardContiner title="About" >
                <Typography>
                    {profile._id}
                    {profile.address}
                    {profile.phone}
                    {profile.city}
                    {profile.age}
                    {profile.gender}
                    {profile.about}
                    {profile.hobbies}
                    {profile.age}
                </Typography>
                <Button onClick={() => setModalIsOpen(true)} className={btnClasses.purpleRoundEmpty}> Edit</Button>

            </CardContiner>

        </div>
    );
}

export default About;