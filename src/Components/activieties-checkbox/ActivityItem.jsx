import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { makeStyles } from "@material-ui/core";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import FormControlLabel from '@mui/material/FormControlLabel';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';

import componentStyles from "../../assets/material-ui-style/componenets/activity";
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

    return (

        <Card className={classes.cardCheckbox}
        >
            <CardMedia
                component="img"
                height="140"
                image={`/activities\\${activity}.gif`}
                alt="green iguana"
            />
            <FormControlLabel
                value="top"
                control={<Checkbox color='secondary' icon={<AddIcon />} checkedIcon={<DoneIcon />}
                    onClick={() => hadelActivity(activity)}
                />}
                label={activity}
                labelPlacement="top"
            />
        </Card>
    );
}

export default ActivityItem;