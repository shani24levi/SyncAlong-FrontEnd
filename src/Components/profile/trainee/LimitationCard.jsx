import React, { useState } from 'react';
import { makeStyles, Typography, Box, Button } from "@material-ui/core";
import CardContiner from '../../card/CardContiner';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import componentStyles from "../../../assets/material-ui-style/componenets/profile";
import buttonsStyles from "../../../assets/theme/buttons";
import { capitalize } from '../../../helpers';
import ProfileEditeModal from '../../profile/forms/edit/ProfileEditeModal';
import { Grid } from '@mui/material';

const useStyles = makeStyles(componentStyles);
const buttonStyle = makeStyles(buttonsStyles);

function LimitationCard({ profile }) {
    const [isOpenLimits, setModalIsOpenLimitations] = useState(false);

    const classes = useStyles();
    const btnClasses = buttonStyle();

    const handelClose = () => {
        setModalIsOpenLimitations(false);
    }

    console.log(profile.limitations);
    return (
        <>
            <CardContiner title="Areas Limitations" subtitle=''>
                {/* <Grid container spacing={3}> */}
                {
                    profile?.limitations?.leght !== 0 ?
                        <>
                            {
                                profile.limitations.map(limit => {
                                    return (
                                        // <Grid item xs={6} md={4}>
                                        <Card className={classes.cardCheckbox}>
                                            <Box sx={{ mx: 'auto', textAlign: 'center', fontSize: '0.875rem', fontWeight: '700' }}>
                                                <CardMedia
                                                    component="img"
                                                    height="80"
                                                    image={`/img/parts/${limit}.jpg`}
                                                    alt="green iguana"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="body1" component="div">
                                                        {capitalize(limit)}
                                                    </Typography>
                                                </CardContent>
                                            </Box>
                                        </Card>
                                        // </Grid>
                                    )
                                })
                            }
                            <Button onClick={() => setModalIsOpenLimitations(true)} className={btnClasses.purpleRoundEmpty}> Edit</Button>
                        </>
                        :
                        <Card className={classes.cardCheckbox}>
                            <Box sx={{ mx: 'auto', textAlign: 'center', fontSize: '0.875rem', fontWeight: '700' }}>
                                <Typography gutterBottom variant="body1" component="div">
                                    No Limitations selcted
                                </Typography>
                                <Button onClick={() => setModalIsOpenLimitations(true)} className={btnClasses.purpleRoundEmpty}> Edit</Button>
                            </Box>
                        </Card>
                }
                {/* </Grid> */}
            </CardContiner>
        </>
    );
}

export default LimitationCard;