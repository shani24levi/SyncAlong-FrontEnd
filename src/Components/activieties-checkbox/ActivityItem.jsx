import React from 'react';
import Card from '@mui/material/Card';
import { makeStyles } from "@material-ui/core";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import FormControlLabel from '@mui/material/FormControlLabel';

import componentStyles from "../../assets/material-ui-style/componenets/profile";
const useStyles = makeStyles(componentStyles);

function ActivityItem({ activity, setActivities, activities }) {  //activities==chosen in clicked
    const classes = useStyles();

    const hadelActivity = (e) => {
        if (activities.length === 0 || !activities.find(i => i === e)) {
            activities.push(e);
        }
        //fillter out from list
        else {
            activities = activities.filter((item) => item !== e);
        }
        setActivities(activities);
    }

    console.log('====================================');
    console.log('activities', activities);
    console.log('====================================');
    return (
        <Card className={classes.cardCheckbox}>
            <FormControlLabel
                value="top"
                control={<Checkbox color='secondary' icon={<FavoriteBorder />} checkedIcon={<Favorite />}
                    onClick={() => hadelActivity(activity)}
                />}
                label={activity}
                labelPlacement="top"
            />
        </Card>
    );
}

export default ActivityItem;